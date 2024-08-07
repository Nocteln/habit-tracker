<template>
  <div
    class="flex items-center justify-center p-4 my-4 hover:translate-y-3 transition duration-500 text-black md:w-[45%] md:m-5"
    :class="bgColor"
  >
    <UIcon :name="icon" class="text-2xl mr-5" />
    <h1>{{ text }}</h1>
  </div>
</template>

<script setup>
const { bgColor, text, icon } = defineProps(["bgColor", "text", "icon"]);
</script>
