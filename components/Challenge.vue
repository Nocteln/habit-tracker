<template>
  <div
    :class="`flex p-5 m-5 items-center justify-evenly rounded-md  w-[45vw] md:w-[30vw] relative ${calculateColor(
      challenge.difficulty
    )}`"
  >
    <img :src="challenge.image" alt="cc" class="h-32" />
    <div class="p-5">
      <h2 class="text-xl font-bold pb-5">{{ challenge.title }}</h2>
      <p>{{ challenge.description }}</p>
      <p class="pt-2 text-xs italic">
        Won <span class="font-bold">{{ challenge.xp }}</span
        >xp by completing this challenge
      </p>
    </div>
    <div
      class="absolute rounded-md w-full h-full bg-opacity-50 bg-white top-0 flex items-center justify-center"
      v-if="isCompleted"
    >
      <h1 class="text-green-500 font-bold text-3xl text-center rotate-12">
        COMPLETED
      </h1>
    </div>
  </div>
</template>

<script setup>
const { challenge, isCompleted } = defineProps(["challenge", "isCompleted"]);

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
