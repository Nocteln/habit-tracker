<template>
  <div class="flex items-center justify-center">
    <UForm
      :schema="schema"
      :state="state"
      @submit="onSubmit"
      class="w-[50vw] bg-black p-5 rounded-xl"
    >
      <UFormGroup label="Subject" name="subject">
        <UInput v-model="state.subject" />
      </UFormGroup>

      <UFormGroup label="Content" name="content">
        <UTextarea v-model="state.content" />
      </UFormGroup>

      <UButton type="submit" class="w-full flex justify-center mt-5">
        Publish
      </UButton>
    </UForm>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const { data } = useAuth();

const schema = z.object({
  subject: z.string().min(2, "Must be at least 5 characters"),
  content: z.string().min(2, "Must be at least 25 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  subject: undefined,
  content: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  //@ts-ignore
  const post = { ...event.data, userId: data.value?.user.id };

  await $fetch(`/api/posts/create`, {
    method: "POST",
    body: post,
  });
}

// definePageMeta({
//   middleware: "need-to-be-identified",
// });
</script>
