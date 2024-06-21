<template>
  <div class="flex items-center justify-center flex-col pt-3">
    <div
      class="flex items-center justify-center m-5 p-5 border-gray-500 border-4 rounded-full"
    >
      <img
        :src="user.data.value.image"
        :alt="`${user.data.value.username}'s profile picture`"
        class="rounded-full"
        width="150"
        height="150"
      />

      <div class="pl-5">
        <h1 class="text-lg font-bold">
          {{ user.data.value.name ? user.data.value.name : "user" }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const userId = route.params.userId;

const user = await useFetch(`/api/user/${userId}`, {
  method: "GET",
});
</script>
