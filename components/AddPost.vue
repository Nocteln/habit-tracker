<template>
  <div class="flex items-center justify-center">
    <UForm
      :schema="schema"
      :state="state"
      @submit="onSubmit"
      class="w-[50vw] bg-black p-5 rounded-xl"
    >
      <!-- <div :class="state.images ? 'flex justify-center items-center' : ''"> -->
      <div class="flex justify-center items-center">
        <div class="min-w-[70%]">
          <UFormGroup label="Subject" name="subject">
            <UInput v-model="state.subject" />
          </UFormGroup>

          <UFormGroup label="Content" name="content">
            <UTextarea v-model="state.content" />
          </UFormGroup>
        </div>

        <UFormGroup label="" name="image" class="max-w-[30%]">
          <label
            for="file-upload"
            class="border-2 rounded-xl bg-slate-500 border-slate-500 cursor-pointer m-3 flex flex-col items-center"
            :class="state.images ? 'p-2' : 'p-5'"
          >
            <UIcon
              name="i-heroicons-photo"
              class="text-5xl"
              :class="state.images ? 'hidden' : ''"
            />
            <p>Add pictures</p>
          </label>
          <input
            type="file"
            id="file-upload"
            @change="handleFileChange"
            multiple
            class="hidden"
          />
          <div v-if="state.images" class="p-2 max-h-64 overflow-auto mt-3">
            <div v-for="image in state.images" :key="image" class="relative">
              <UIcon
                :name="loading ? 'i-heroicons-arrow-path' : 'i-heroicons-trash'"
                class="absolute h-20 w-20 right-2 top-2 text-red-700"
                :class="loading ? 'animate-spin' : ''"
                @click="handleDeleteFile(image)"
              />
              <img :src="image" class="p-2" />
            </div>
          </div>
          <!-- <div class="p-2 max-h-64 overflow-auto mt-3">
            <div class="relative">
              <UIcon
                name="i-heroicons-trash"
                class="absolute h-20 w-20 right-2 top-2 text-red-700"
              />
              <img src="../public/uploads/20220429_132438.jpg" class="p-2" />
            </div>
            <img src="../public/uploads/20220429_132438.jpg" class="p-2" />
          </div> -->
          <p v-if="loading" class="text-white">loading</p>
        </UFormGroup>
      </div>
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
const toast = useToast();

const schema = z.object({
  subject: z.string().min(2, "Must be at least 5 characters"),
  content: z.string().min(2, "Must be at least 25 characters"),
  images: z.string().array().optional(),
});

const files = ref<FileList | null>(null);
const loading = ref(false);

function handleDeleteFile(img) {
  state.images = state.images.filter((image) => image !== img);
}

const handleFileChange = async (event) => {
  loading.value = true;
  files.value = event.target.files;

  if (files?.value?.length > 5) {
    toast.add({
      id: "too many files",
      title: "Too many files",
      description: "You can't add more than 5 files!",
    });
    loading.value = false;
    return;
  }

  const formData = new FormData();
  Array.from(files.value).forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await fetch("/api/posts/upload", {
      method: "POST",
      body: formData,
    });
    const res = await response.json();

    console.log(res);

    if (response.ok) {
      console.log("Files uploaded successfully:", response);
      state.images = res;
      console.log(state.images);
    } else {
      console.error("Upload failed");
    }
  } catch (error) {
    console.error("Error uploading files:", error);
  }

  loading.value = false;
};

type Schema = z.output<typeof schema>;

const state = reactive({
  subject: undefined,
  content: undefined,
  images: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  //@ts-ignore
  const post = {
    ...event.data,
    userId: data.value?.user.id,
    timestamp: Date.now(),
  };

  await $fetch(`/api/posts/create`, {
    method: "POST",
    body: post,
  });
}

// definePageMeta({
//   middleware: "need-to-be-identified",
// });
</script>
