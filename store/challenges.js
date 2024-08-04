// store/challenges.js
import { defineStore } from "pinia";
// TODO: retirer le fichier challenge et tout mettre dans le userStore sa sera plus simple
export const useChallengeStore = defineStore("challenges", {
  state: () => ({
    challenges: [],
  }),
  actions: {
    async incrementCount(challengeId) {
      const challenge = this.challenges.find((c) => c.id === challengeId);

      if (challenge && !challenge.completed) {
        challenge.count++;
        if (challenge.count >= challenge.goal) {
          console.log("challenge completed");
          await $fetch(`/api/challenges/complete`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ challengeId: challenge.id }),
          });
          challenge.completed = true;
          return;
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
