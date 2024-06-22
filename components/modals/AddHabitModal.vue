<script lang="ts" setup>
import { z } from "zod";
import type { FormError, FormSubmitEvent } from "#ui/types";

// @ts-ignore
const emit = defineEmits(["added"]);

const { data } = useAuth();
if (!data) {
  console.log("no data");
}
const schema = z.object({
  name: z.string().max(24, "Your new habit can not be more than 24 characters"),
  dateEnd: z.string(),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  name: undefined,
  description: undefined,
  icone: undefined,
  iconColor: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ path: "text", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);

  const goal = {
    ...event.data,
    userId: data.value?.user?.id,
    streak: 1,
  };

  await fetch("http://localhost:3000/api/goal/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goal),
  });

  emit("added", goal);
}

function changeIcon(icon) {
  console.log(`Icon selected: ${icon}`);
}
</script>

<template>
  <UCard>
    <div class="space-y-2">
      <h1>Add an habit :</h1>
      <UForm
        :validate="validate"
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

        <UPopover :popper="{ placeholder: 'bottom-start' }">
          <UButton
            color="white"
            label="Select an icon"
            trailing-icon="i-heroicons-chevron-down-20-solid"
          />

          <template #panel>
            <IconSelector @changeIcon="changeIcon" />
          </template>
        </UPopover>

        <UButton type="submit" class="mt-5" block size="lg"> Add </UButton>
      </UForm>
    </div>
  </UCard>
</template>
