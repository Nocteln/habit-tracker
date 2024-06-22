<template>
  <div
    class="m-5 p-5 bg-black w-[80vw] sm:w-full rounded-lg items-center justify-between flex flex-col sm:flex-row"
  >
    <div
      class="flex items-center justify-center sm:justify-start space-x-4 sm:ml-5"
    >
      <UIcon :name="goal.icon" class="text-3xl" :class="goal.color" />
      <div class="flex items-center">
        <UIcon name="i-heroicons-fire" class="text-2xl text-orange-400 mr-1" />
        <h1 class="text-lg">{{ goal.streak }}</h1>
      </div>
    </div>
    <div class="text-center flex-1 mx-4">
      <h1 class="font-bold text-2xl truncate">{{ goal.name }}</h1>
      <p class="truncate">{{ goal.description }}</p>
    </div>
    <div class="flex items-center space-x-4 pt-3 sm:pt-0 md:mr-5">
      <UButton class="px-10 font-bold md:px-10">Fait</UButton>
    </div>
  </div>
</template>

<script setup>
const { goal } = defineProps(["goal"]);
</script>
