<template>
  <div class="flex flex-wrap items-center text-center">
    <div v-for="challenge in challengesStore.challenges" :key="challenge.id">
      <Challenge :challenge="challenge" />
    </div>
    <!-- <UButton size="xl" @click="user.completeChallenge(challenges[1])" /> -->
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";
import { useChallengeStore } from "~/store/challenges";

const user = useUserStore();

const challengesStore = useChallengeStore();
</script>
