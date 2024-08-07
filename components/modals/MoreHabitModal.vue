<script lang="ts" setup>
import { z } from "zod";
import type { FormError, FormSubmitEvent } from "#ui/types";
import { useUserStore } from "~/store/user";

// @ts-ignore
const emit = defineEmits(["added", "adding"]);
const { goal } = defineProps(["goal"]);

const loading = ref(false);

const { data } = useAuth();
if (!data) {
  console.log("no data");
}
const schema = z.object({
  name: z.string().max(24, "Your new habit can not be more than 24 characters"),
  description: z
    .string()
    .max(200, "Your new habit description can not be more than 200 characters"),
  icon: z.string(),
  iconColor: z.string(),
});
console.log(goal._id);
const goalId = goal._id;
type Schema = z.output<typeof schema>;

const state = reactive({
  name: goal.name,
  description: goal.description,
  icon: goal.icon,
  iconColor: goal.iconColor,
});

async function onSubmitEdit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
  loading.value = true;
  emit("adding");

  const newgoal = {
    ...event.data,
    userId: data.value?.user?.id,
    streak: 1,
    id: goal._id,
  };

  const goalComplete = await $fetch(
    `/api/goal/edit?id=${"66b34b72623f8c203dd55f1a"}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ goal: newgoal }),
    }
  );
  loading.value = false;
  console.log("all", goalComplete);

  //   emit("added", goalComplete);
}

function changeIcon(icon: string) {
  state.icon = icon;
}

function changeColor(color: string) {
  state.iconColor = color;
}
</script>

<template>
  <UCard>
    <div v-if="!loading" class="flex justify-evenly">
      <div class="space-y-2">
        <h1>Edit your habit :</h1>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4 text-center"
          @submit="onSubmitEdit"
        >
          <UFormGroup label="Name" name="name">
            <UInput v-model="state.name" placeholder="eat healthy" />
          </UFormGroup>
          <UFormGroup label="Description" name="description">
            <UInput
              v-model="state.description"
              placeholder="eat 5 fruits and vegetables"
            />
          </UFormGroup>

          <div class="flex items-center justify-center">
            <UPopover :popper="{ placeholder: 'bottom-start' }">
              <UButton
                color="white"
                label="Select an icon"
                trailing-icon="i-heroicons-chevron-down-20-solid"
                class="w-full"
              />

              <template #panel>
                <IconSelector
                  @changeIcon="changeIcon"
                  @changeColor="changeColor"
                  :icon="state.icon"
                  :iconColor="state.iconColor"
                />
              </template>
            </UPopover>
            <Icon
              :name="`i-heroicons-${state.icon}`"
              :class="`text-${state.iconColor}`"
              size="24"
            />
          </div>
          <UButton type="submit" class="mt-5" block size="lg"> Edit </UButton>
        </UForm>
      </div>
      <div>
        <h1>Settings</h1>
      </div>
    </div>
    <div v-else class="flex items-center text-center justify-center">
      <Icon name="i-heroicons-arrow-path" size="50" class="animate-spin" />
    </div>
  </UCard>
</template>
