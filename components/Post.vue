<template>
  <div class="bg-black text-white m-5 p-5 w-[50vw] rounded-2xl">
    <div class="flex flex-col">
      <div class="flex items-center p-2 relative">
        <NuxtLink
          :to="`app/user/${userId}`"
          class="flex items-center hover:underline p-3"
        >
          <UAvatar
            :src="poster.image"
            :alt="`Profile picture of ${poster.username}`"
          />
          <h1 class="pl-3 text-lg">{{ poster.username }}</h1>
        </NuxtLink>
        <h3 class="pl-5 absolute text-xs italic right-0">
          {{ date }}
        </h3>
      </div>
      <div class="p-2">
        <h1 class="font-bold text-2xl">{{ subject }}</h1>
        <p>{{ content }}</p>
      </div>
    </div>
    <div v-if="images" class="p-2 mt-3 flex flex-wrap justify-center">
      <div v-for="image in images" :key="image">
        <img :src="image" class="p-2 max-h-64" />
      </div>
    </div>
  </div>
</template>
<script setup>
const { subject, userId, content, images, createdAt } = defineProps([
  "subject",
  "userId",
  "content",
  "images",
  "createdAt",
]);

const poster = await $fetch(`/api/user/${userId}`, {
  method: "GET",
});

function formatDate(dateString) {
  const date = new Date(dateString);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

const date = formatDate(createdAt);
</script>
