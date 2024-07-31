<template>
  <h1>Level {{ userLevel }}</h1>
  <div class="flex items-center w-[90vw] md:w-[50vw]">
    <p class="pr-5">{{ user.xp }}</p>
    <UProgress
      :value="user.xp"
      :max="xpForNextLevel(user.xp) + user.xp"
      size="xl"
    />
    <p class="pl-5">{{ xpForNextLevel(user.xp) + user.xp }}</p>
  </div>
  <p class="text-xs text-slate-900">
    You can get xp by completing goals and challenges
  </p>
</template>

<script setup>
const { userId } = defineProps(["userId"]);

const userLevel = ref(1);

import { useUserStore } from "~/store/user";

const user = useUserStore();

userLevel.value = calculateLevel(user.xp);
</script>
