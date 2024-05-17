<template>
  a goal
  {{ name }}
  {{ dateEnd }}
  {{ dateStart }}
</template>

<script setup>
const props = defineProps(["name", "dateEnd", "dateStart"]);
</script>
