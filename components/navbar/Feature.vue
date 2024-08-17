<template>
  <div
    class="rounded-[23.97px] border-[1.24px] p-[17.98px] gap-[17.98px] border-[#E4E4EB] w-[70vw] md:w-[30vw] items-start text-start"
  >
    <img
      :src="image"
      :alt="`${name} image`"
      width="464.1px"
      height="464.1px"
      class="rounded-[23.97px]"
    />
    <h1 class="text-[34px] font-semibold">{{ name }}</h1>
    <p class="text-[16px] pt-8">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
const { name, description, image } = defineProps([
  "name",
  "description",
  "image",
]);
</script>
