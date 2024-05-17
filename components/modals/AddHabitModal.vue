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
  dateEnd: undefined,
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.name) errors.push({ path: "text", message: "Required" });
  if (!state.dateEnd) errors.push({ path: "date", message: "Required" });
  return errors;
};

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);

  const currentDate = new Date();
  const dateFormat = currentDate.toLocaleDateString("fr");

  const goal = {
    ...event.data,
    userId: data.value?.user.id,
    dateStart: dateFormat,
  };

  await fetch("http://localhost:3000/api/goal/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(goal),
  });

  emit("added");
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
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup
          label="Name"
          name="name"
          help="The name of the habit you want to take"
        >
          <UInput v-model="state.name" placeholder="eat healfy" />
        </UFormGroup>

        <UFormGroup
          label="Date goal"
          name="dateEnd"
          help="Your goal of when you want to get the habits."
        >
          <UInput v-model="state.dateEnd" type="date" />
        </UFormGroup>

        <UButton type="submit"> Add </UButton>
      </UForm>
    </div>
  </UCard>
</template>
