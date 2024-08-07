<template>
  <h1>Level {{ userLevel }}</h1>
  <div class="flex items-center w-[90vw] md:w-[50vw]" v-if="isAProfileDisplay">
    <p class="pr-5">{{ propsUser.xp }}</p>
    <UProgress
      :value="propsUser.xp"
      :max="xpForNextLevel(propsUser.xp) + propsUser.xp"
      size="xl"
      v-if="isAProfileDisplay"
    />

    <p class="pl-5">
      {{ xpForNextLevel(propsUser.xp) + propsUser.xp }}
    </p>
  </div>
  <div class="flex items-center w-[90vw] md:w-[50vw]" v-else>
    <p class="pr-5">{{ user.xp }}</p>
    <UProgress
      :value="user.xp"
      :max="xpForNextLevel(user.xp) + user.xp"
      size="xl"
    />
    <p class="pl-5">
      {{ xpForNextLevel(user.xp) + user.xp }}
    </p>
  </div>
  <p class="text-xs text-slate-900" v-if="!isAProfileDisplay">
    You can get xp by completing goals and challenges
  </p>
</template>

<script setup>
const { propsUser, isAProfileDisplay } = defineProps([
  "propsUser",
  "isAProfileDisplay",
]);

if (!propsUser) {
  console.error("User props not provided");
}
// console.log("u", propsUser);
const userLevel = ref(1);

import { useUserStore } from "~/store/user";

const user = useUserStore();

if (isAProfileDisplay) {
  userLevel.value = calculateLevel(propsUser.xp);
} else {
  userLevel.value = calculateLevel(user.xp);
}
</script>
