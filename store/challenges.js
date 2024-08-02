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
    async fetchChallenges() {
      const data = await $fetch(
        "/api/challenges/list?userId=104237058315501057178"
      );

      this.challenges = data;
    },
  },
});
