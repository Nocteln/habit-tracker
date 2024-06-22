<template>
  <IconSelector @changeIcon="changeIcon" />
</template>

<script setup>
function changeIcon(icon) {
  console.log(`Icon selected: ${icon}`);
}
</script>
