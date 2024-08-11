<script lang="ts" setup>
import { z } from "zod";

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

type Schema = z.output<typeof schema>;

const state = reactive({
  name: goal.name,
  description: goal.description,
  icon: goal.icon,
  iconColor: goal.iconColor,
});

const IsDisplayedOnProfile = ref(goal.displayedOnProfile);

async function onSubmit() {
  loading.value = true;
  emit("adding");

  const newgoal = {
    ...state,
    userId: data.value?.user?.id,
    streak: 1,
    id: goal._id,
    displayed: IsDisplayedOnProfile.value,
  };

  const goalComplete = await $fetch(`/api/goal/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ goal: newgoal }),
  });
  loading.value = false;

  emit("added", goalComplete);
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
    <div v-if="!loading" class="flex flex-col md:flex-row justify-evenly">
      <div class="space-y-2">
        <h1>Edit your habit :</h1>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4 text-center"
          @submit="onSubmit"
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
            <UIcon
              :name="`i-heroicons-${state.icon}`"
              :class="`text-${state.iconColor}`"
              size="24"
            />
          </div>
        </UForm>
      </div>
      <div>
        <h1 class="pb-5 pt-5 md:pt-0">Settings</h1>
        <UCheckbox
          v-model="IsDisplayedOnProfile"
          label="display on your profile"
        />
        <p class="text-sm pt-5 font-light italic">More comming soon</p>
      </div>
    </div>
    <UButton @click="onSubmit" class="mt-5" block size="lg"> Save </UButton>
    <div v-if="loading" class="flex items-center text-center justify-center">
      <UIcon name="i-heroicons-arrow-path" size="50" class="animate-spin" />
    </div>
  </UCard>
</template>
