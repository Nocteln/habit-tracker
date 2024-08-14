<template>
  <div class="flex flex-col items-center text-[#023047] min-h-[70vh]">
    <h1 class="text-2xl font-bold m-7">personal informations</h1>
    <UForm
      :schema="schema"
      :state="state"
      class="space-y-4 md:space-y-0 flex flex-col gap-4 items-center max-w-[90vw] md:w-[50vw]"
      @submit="onSubmit"
    >
      <UFormGroup
        label="Name"
        name="password"
        :ui="{ label: { base: 'text-elephant-950' } }"
      >
        <UInput v-model="state.name" type="text" variant="settings" />
      </UFormGroup>
      <UFormGroup
        label="Username"
        name="password"
        :ui="{ label: { base: 'text-elephant-950' } }"
      >
        <UInput variant="settings" v-model="state.username" type="text" />
      </UFormGroup>
      <UCheckbox
        :ui="{ label: { base: 'text-elephant-950' } }"
        class="items-center justify-center flex"
        v-model="state.notifications"
        size="xl"
        label="activate/desactivate public post when passing a level/completing a challenge"
      />

      <UButton type="submit" size="xl" class="px-12" color="amber">
        Save
      </UButton>
    </UForm>
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold m-7 text-red-500">sensitive area</h1>
      <div class="flex flex-col items-center gap-4">
        <UButton @click="resetModal = true" color="red">Reset my data</UButton>
        <UModal v-model="resetModal" :prevent-close="preventClosing">
          <ResetModal
            @adding="preventClosing = true"
            @added="preventClosing = false"
            :userId="user.id"
          />
        </UModal>
        <UModal v-model="deleteModal" :prevent-close="preventClosing">
          <DeleteModal
            @adding="preventClosing = true"
            @added="preventClosing = false"
            :userId="user.id"
          />
        </UModal>
        <UButton color="red" @click="deleteModal = true"
          >Delete my account</UButton
        >
      </div>
    </div>
  </div>
</template>

<script setup>
// settigns : messages dans le chat quand on complete un challenge
import { useUserStore } from "~/store/user";
import { z } from "zod";
// import type { FormSubmitEvent } from "#ui/types";
import ResetModal from "~/components/modals/ResetModal.vue";
import DeleteModal from "~/components/modals/DeleteModal.vue";

const toast = useToast();

const user = useUserStore();
await user.fetch();

const resetModal = ref(false);
const deleteModal = ref(false);
const preventClosing = ref(false);

const schema = z.object({
  name: z
    .string()
    .min(3, "Must be at least 3 characters")
    .max(25, "Can't be more than 25 characters"),
  username: z
    .string()
    .min(3, "Must be at least 3 characters")
    .max(25, "Can't be more than 25 characters"),
  notifications: z.boolean(),
});

// type Schema = z.output<typeof schema>;

const state = reactive({
  name: user.name,
  username: user.username,
  notifications: user.settings.notifications,
});

async function onSubmit(event) {
  //: FormSubmitEvent<Schema>
  console.log(event.data);
  await $fetch("/api/user/edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...event.data, id: user.id }),
  });

  toast.add({
    id: user.id,
    title: "Success!",
    description: "Your profile has been updated.",
  });
}

definePageMeta({
  layout: "page",
  middleware: "need-to-be-identified",
});
</script>
