<script lang="ts" setup>
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

// @ts-ignore
const emit = defineEmits(["updated"]);

const { data } = useAuth();
if (!data) {
  console.log("no data");
}
// @ts-ignore
const { email, username, name, google, id } = data.value?.user;

const schema = z.object({
  email: z.string().email("Invalid email"),
  name: z.string().max(24, "Your name can not be more than 24 characters"),
  username: z
    .string()
    .max(24, "Your username can not be more than 24 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email,
  name,
  username,
  id,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  console.log(event.data);
  await fetch("http://localhost:3000/api/user/edit", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event.data),
  });

  emit("updated");
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
        <UFormGroup
          label="Email"
          name="email"
          :help="
            google
              ? 'You are signed in with google. You can\'t change your email!'
              : ''
          "
        >
          <UInput v-model="state.email" :disabled="google" />
        </UFormGroup>

        <UFormGroup label="Username" name="username">
          <UInput v-model="state.username" type="text" />
        </UFormGroup>

        <UFormGroup label="Name" name="name">
          <UInput v-model="state.name" type="text" />
        </UFormGroup>

        <UButton type="submit"> Update </UButton>
      </UForm>
    </div>
  </UCard>
  <!-- </UModal> -->
</template>
