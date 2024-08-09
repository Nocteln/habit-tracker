<template>
  <div
    class="flex flex-col bg-pacific-blue-500 gap-5 p-5 m-10 w-[85vw] rounded-md md:flex-row items-center hover:translate-y-3 transition duration-500"
    :class="reversed ? 'md:flex-row-reverse' : ''"
  >
    <img :src="image" alt="habit_page" class="w-[60vw] rounded-lg" />
    <div class="bg-pacific-blue-600 text-pacific-blue-50 p-2 h-full">
      <h1 class="text-2xl font-bold">{{ name }}</h1>
      <p>{{ description }}</p>
      <UButton size="xl" class="font-bold mt-5"
        ><NuxtLink to="login" v-if="status !== 'authenticated'"
          >Join US !</NuxtLink
        >
        <NuxtLink to="app" v-else>Go to the app!</NuxtLink>
      </UButton>
    </div>
  </div>
</template>

<script setup>
const { image, name, description, reversed } = defineProps([
  "image",
  "name",
  "description",
  "reversed",
]);
const { status } = useAuth();
</script>
