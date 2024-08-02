<template>
  <div class="flex flex-wrap items-center text-center">
    <!-- <div v-for="challenge in challenges" :key="challenge.id">
      {{ challenge }}
      <Challenge :challenge="challenge" :isCompleted="challenge.completed" />
    </div>
    <UButton size="xl" @click="user.completeChallenge(challenges[1])" /> -->
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";
import { useChallengeStore } from "~/store/challenges";

const user = useUserStore();
const challenges = useChallengeStore();
await callOnce(challenges.fetchChallenges);
console.log(challenges);
</script>
