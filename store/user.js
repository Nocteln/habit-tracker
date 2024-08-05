export const useUserStore = defineStore("userStore", {
  state: () => ({
    username: "",
    email: "",
    id: "",
    xp: 0,
    name: "",
    followList: [],
    image: "",
    challenges: [],
  }),
  actions: {
    async fetch() {
      const { data } = useAuth();

      const id = data.value.user.id;

      const infos = await $fetch(`/api/user/${id}`);
      this.username = infos.username;
      this.email = infos.email;
      this.id = id;
      this.xp = infos.xp;
      this.name = infos.name;
      this.followList = infos.followList;
      this.image = infos.image;
      this.challenges = infos.challenges;
    },
    addXpToUser(xpToAdd) {
      console.log("slt", xpToAdd);
      this.xp += xpToAdd;
      addXp(this.xp, xpToAdd);
    },
    // async completeChallenge(challenge) {
    //   await $fetch("/api/challenges/complete", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ challengeId: challenge.id, userId: this.id }),
    //   });
    //   console.log(challenge);
    //   this.addXpToUser(challenge.xp);

    //   this.challenges.push(challenge.id);
    // },

    async incrementChallengeCount(challengeId) {
      const challenge = this.challenges.find((c) => c.id === challengeId);
      console.log("cc");
      if (challenge && !challenge.completed) {
        challenge.count++;
        $fetch(`/api/challenges/increment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ challengeId: challenge.id, userId: this.id }),
        });
        if (challenge.count >= challenge.goal) {
          console.log("challenge completed");
          await $fetch(`/api/challenges/complete`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ challengeId: challenge.id }),
          });

          await $fetch(`/api/posts/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: this.id,
              subject: `✨${this.username} has completed a challenge ✨`,
              content: `🎉Congratulations, ${this.username} completed the challenge "${challenge.title}"!`,
            }),
          });
          challenge.completed = true;
          return;
        }
      }
    },
  },
});
