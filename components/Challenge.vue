<template>
  <div
    :class="`flex p-5 m-5 items-center justify-evenly rounded-md w-[90vw] md:w-[45vw] lg:w-[40vw] md:h-[25vh] h-[20vh] relative ${calculateColor(
      challenge.difficulty
    )}`"
  >
    <img :src="challenge.image" alt="cc" class="h-24 md:h-32" />
    <div class="p-2 md:pb-5">
      <h2 class="text-xl font-bold pb-2 md:pb-5">{{ challenge.title }}</h2>
      <p>{{ challenge.description }}</p>
      <p class="pt-2 text-xs italic">
        Won <span class="font-bold">{{ challenge.xp }}</span
        >xp by completing this challenge
      </p>
    </div>
    <div
      class="absolute rounded-md w-full h-full bg-opacity-50 bg-white top-0 flex items-center justify-center"
      v-if="challenge.completed && !isAProfileDisplay"
    >
      <h1 class="text-green-500 font-bold text-3xl text-center rotate-12">
        COMPLETED
      </h1>
    </div>
  </div>
</template>

<script setup>
const { challenge, isAProfileDisplay } = defineProps([
  "challenge",
  "isAProfileDisplay",
]);

function calculateColor(difficulty) {
  switch (difficulty) {
    case "easy":
      return "bg-green-500 text-white";
    case "medium":
      return "bg-yellow-500 text-black";
    case "hard":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
}
</script>
