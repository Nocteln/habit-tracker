export const useUserStore = defineStore("userStore", {
  state: () => ({
    username: "",
    email: "",
    id: "",
    xp: 0,
    name: "",
    followList: [],
    image: "",
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
    addXp(xpToAdd) {
      this.xp += xpToAdd;
    },
    completeChallenge(challengeId) {
      this.challenges.push(challengeId);
    },
  },
});
