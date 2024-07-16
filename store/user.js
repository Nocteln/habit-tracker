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

      const infos = await $fetch(`/api/user/${data.value.user.id}`);
      this.username = infos.username;
      this.email = infos.email;
      this.id = id;
      this.xp = infos.xp;
      this.name = infos.name;
      this.followList = infos.followList;
      this.image = infos.image;
    },
    addXp(xpToAdd) {
      this.xp += xpToAdd;
    },
  },
});
