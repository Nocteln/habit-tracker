<script lang="ts" setup>
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: "zdvdvfs",
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);
}
</script>

<template>
  <!-- <UModal v-model="props.isOpen"> -->
  <UCard>
    <div class="space-y-2">
      <h1>Your informations :</h1>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormGroup label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormGroup>

        <UFormGroup label="Password" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormGroup>

        <UButton type="submit"> Enregistrer </UButton>
      </UForm>
    </div>
  </UCard>
  <!-- </UModal> -->
</template>
