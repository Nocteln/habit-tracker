<template>
  <div class="flex items-center justify-center flex-col pt-3">
    <div
      class="flex items-center justify-center m-5 p-5 border-gray-500 border-4 rounded-full"
    >
      <img
        :src="data?.user?.image"
        :alt="`${data?.user?.name}'s profile picture`"
        class="rounded-full"
        width="150"
        height="150"
      />

      <div class="pl-5">
        <h1 class="text-lg font-bold">
          {{ data?.user?.name ? data?.user?.name : "user" }}
        </h1>
        <h2>{{ data?.user?.email }}</h2>
        <UButton @click="isEditOpen = true" class="my-2 px-5"
          >Edit <UIcon name="i-heroicons-pencil-square"
        /></UButton>
      </div>
    </div>
    <p>{{ data?.user }}</p>
  </div>
</template>

<script setup lang="ts">
import { EditUserInfoModal } from "#components";
const { data } = useAuth();

const modal = useModal();
let userInfo;

const isEditOpen = ref(false);

console.log(userInfo);

definePageMeta({
  middleware: "need-to-be-identified",
});
</script>

<style lang="scss" scoped></style>
