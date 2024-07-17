<template>
  <div class="flex flex-wrap items-center text-center">
    <div v-for="challenge in challenges" :key="challenge.id">
      <Challenge :challenge="challenge" />
    </div>
  </div>
</template>

<script setup>
import { challenges } from "~/utils/challenges";
</script>
