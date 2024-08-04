// store/challenges.js
import { defineStore } from "pinia";

export const useChallengeStore = defineStore("challenges", {
  state: () => ({
    challenges: [],
  }),
  actions: {
    async incrementCount(challengeId) {
      const challenge = this.challenges.find((c) => c.id === challengeId);
      console.log(challenge);
      if (challenge && !challenge.completed) {
        challenge.count++;
        if (challenge.count >= challenge.goal) {
          console.log("challenge completed");
          const t = await $fetch(`/api/challenges/complete`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ challengeId: challenge.id }),
          });
          challenge.completed = true;
          console.log("server");
          // Notifier l'utilisateur
        }
        $fetch(`/api/challenges/increment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ challengeId: challenge.id }),
        });
      }
    },
    async fetchChallenges(userId) {
      const data = await $fetch(`/api/challenges/list?userId=${userId}`);

      this.challenges = data;
    },
  },
});
