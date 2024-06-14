<template>
  <div class="bg-black text-white m-5 p-5 w-[50vw] rounded-2xl">
    <div class="flex flex-col">
      <div class="flex items-center p-2">
        <UAvatar
          :src="poster.image"
          :alt="`Profile picture of ${poster.username}`"
        />
        <h1>{{ poster.username }}</h1>
      </div>
      <div class="p-2">
        <h1 class="font-bold text-2xl">{{ subject }}</h1>
        <p>{{ content }}</p>
      </div>
    </div>
    <div><!--  images  --></div>
  </div>
</template>
<script setup>
const { subject, userId, content } = defineProps([
  "subject",
  "userId",
  "content",
]);

const poster = await $fetch(`http://localhost:3000/api/user/${userId}`, {
  method: "GET",
});
// console.log(poster);
</script>
