<template>
  <div
    class="flex items-center justify-center p-4 hover:translate-y-3 transition duration-500 text-[#1D2130] w-[80vw] md:w-[25vw] my-12 md:m-5 rounded-md shadow-md border-2"
    :class="`shadow-${color} border-${color}`"
  >
    <UIcon :name="icon" class="text-2xl mr-5" :class="`text-${color}`" />
    <h1 class="font-semibold">{{ text }}</h1>
  </div>
</template>

<script setup>
const { color, text, icon } = defineProps(["color", "text", "icon"]);
</script>
