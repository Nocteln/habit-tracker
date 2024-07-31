<template>
  <div class="flex flex-wrap items-center text-center">
    <div v-for="challenge in challenges" :key="challenge.id">
      <Challenge
        :challenge="challenge"
        :isCompleted="checkCompletion(challenge)"
      />
    </div>
    <UButton size="xl" @click="user.completeChallenge(challenges[2])" />
  </div>
</template>

<script setup>
import { challenges } from "~/utils/challenges";
import { useUserStore } from "~/store/user";

const user = useUserStore();

function checkCompletion(challenge) {
  return user.challenges.includes(challenge.id);
}
</script>
