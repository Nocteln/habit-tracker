<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl font-bold m-7">personal informations</h1>
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 md:space-y-0 flex flex-col md:flex-row items-center"
      @submit="onSubmit"
    >
      <!-- <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup> -->
      <div class="md:mr-4 space-y-4">
        <UFormGroup label="Name" name="password">
          <UInput v-model="state.name" type="text" />
        </UFormGroup>
        <UFormGroup label="Username" name="password">
          <UInput v-model="state.username" type="text" />
        </UFormGroup>
      </div>

      <UButton type="submit" size="xl" color="amber"> Edit </UButton>
    </UForm>
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold m-7 text-red-500">sensitive area</h1>
      <UButton color="red">Reset my data</UButton>
      <UButton color="red">Delete my account</UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "~/store/user";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const user = useUserStore();
await user.fetch();

const schema = z.object({
  email: z.string().email("Invalid email"),
  name: z
    .string()
    .min(3, "Must be at least 3 characters")
    .max(25, "Can't be more than 25 characters"),
  username: z
    .string()
    .min(3, "Must be at least 3 characters")
    .max(25, "Can't be more than 25 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: user.email,
  name: user.name,
  username: user.username,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);
}
</script>
