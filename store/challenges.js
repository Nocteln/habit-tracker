// store/challenges.js
import { defineStore } from "pinia";

export const useChallengeStore = defineStore("challenges", {
  state: () => ({
    challenges: [],
  }),
  actions: {
    incrementCount(challengeId) {
      const challenge = this.challenges.find((c) => c.id === challengeId);
      if (challenge && !challenge.completed) {
        challenge.count++;
        if (challenge.count >= challenge.goal) {
          console.log("challenge completed");
          challenge.completed = true;
          // Notifier l'utilisateur
        }
      }
    },
    async fetchChallenges(userId) {
      const data = await $fetch(`/api/challenges/list?userId=${userId}`);

      this.challenges = data;
    },
  },
});
