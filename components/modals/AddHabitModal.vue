<script lang="ts" setup>
import { z } from "zod";
import type { FormError, FormSubmitEvent } from "#ui/types";

// @ts-ignore
const emit = defineEmits(["added", "adding"]);

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
  name: undefined,
  description: undefined,
  icon: "check",
  iconColor: "blue-400",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
  loading.value = true;
  emit("adding");

  const goal = {
    ...event.data,
    userId: data.value?.user?.id,
    streak: 1,
  };

  const goalComplete = await fetch("http://localhost:3000/api/goal/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goal),
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
    <div class="space-y-2" v-if="!loading">
      <h1>Add an habit :</h1>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4 text-center"
        @submit="onSubmit"
      >
        <UFormGroup
          label="Name"
          name="name"
          help="The name of the habit you want to take"
        >
          <UInput v-model="state.name" placeholder="eat healthy" />
        </UFormGroup>
        <UFormGroup
          label="Description"
          name="description"
          help="The description of the habit you want to take"
        >
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

        <UButton type="submit" class="mt-5" block size="lg"> Add </UButton>
      </UForm>
    </div>
    <div v-else class="flex items-center text-center justify-center">
      <Icon name="i-heroicons-arrow-path" size="50" class="animate-spin" />
    </div>
  </UCard>
</template>
