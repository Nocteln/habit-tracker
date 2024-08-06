<template>
  <div class="flex flex-wrap items-center text-center justify-center">
    <div v-for="challenge in user.challenges" :key="challenge.id">
      <Challenge :challenge="challenge" />
    </div>
    <!-- <UButton size="xl" @click="user.completeChallenge(challenges[1])" /> -->
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";

const user = useUserStore();
</script>
