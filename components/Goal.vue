<template>
  <div
    class="m-5 p-5 bg-black w-[80vw] sm:w-full rounded-lg sm:rounded-none items-center justify-between flex flex-col sm:flex-row"
  >
    <div
      class="flex items-center justify-center sm:justify-start space-x-4 sm:ml-5"
    >
      <Icon
        :name="`i-heroicons-${goal.icon}`"
        class="text-3xl"
        :class="`text-${goal.iconColor}`"
      />
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
const { name, description, icon, iconColor, goal } = defineProps([
  "name",
  "description",
  "icon",
  "iconColor",
  "goal",
]);
// console.log(goal);
</script>
