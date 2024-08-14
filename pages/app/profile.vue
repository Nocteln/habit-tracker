<template>
  <div class="flex items-center justify-center flex-col pt-3 min-h-[70vh]">
    <div class="flex items-center justify-center m-5 p-5">
      <img
        :src="data?.user?.image ? data?.user?.image : ''"
        :alt="`${data?.user?.name}'s profile picture`"
        class="rounded-md"
        width="150"
        height="150"
      />

      <div class="pl-5">
        <h1 class="text-lg font-bold">
          {{ data?.user?.name ? data?.user?.name : "user" }}
        </h1>
        <h2>{{ data?.user?.email }}</h2>
        <!--
        <UButton @click="isEditOpen = true" class="my-2 px-5" 
    icon="i-heroicons-pencil-square"
          >Edit </UButton>-->
      </div>
    </div>
    <Level :propsUser="data?.user?.id" :isAProfileDisplay="false" />

    <UButton class="my-10 p-5" icon="i-heroicons-user-circle">
      <NuxtLink :to="`/app/user/${data?.user.id}`"
        >Check your public profile</NuxtLink
      >
    </UButton>
    <Challenges />
    <!-- <p>{{ data?.user }}</p> -->
  </div>
  <!--<UModal v-model="isEditOpen">
    <EditUserInfoModal @updated="handleClose" />
  </UModal>-->
</template>

<script setup lang="ts">
// import { EditUserInfoModal } from "#components";
const { data } = useAuth();
import { useUserStore } from "~/store/user";
// import { useChallengeStore } from "~/store/challenges";

if (!data) {
  navigateTo("/login");
}

const user = useUserStore();
await callOnce(user.fetch);

// const challengesStore = useChallengeStore();
// await challengesStore.fetchChallenges(user.id);

const isEditOpen = ref(false);

function handleClose() {
  isEditOpen.value = false;
  console.log("close");
}

definePageMeta({
  middleware: "need-to-be-identified",
  layout: "page",
});
</script>

<style lang="scss" scoped></style>
