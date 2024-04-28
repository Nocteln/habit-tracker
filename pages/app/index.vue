<template>
  <h1>hey {{ $auth.user?.name }}</h1>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth-logged-in"],
});
</script>

<style lang="scss" scoped></style>
