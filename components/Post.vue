<template>
  <div class="bg-black text-white m-5 p-5 w-[50vw] rounded-2xl">
    <div class="flex flex-col">
      <div>
        <h1>{{ poster.username }}</h1>
      </div>
      <h1 class="font-bold text-2xl">{{ subject }}</h1>
      <p>{{ poster.name }}</p>
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
console.log(poster);
</script>
