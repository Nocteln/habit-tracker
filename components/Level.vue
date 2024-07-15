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

const user = await $fetch(`/api/user/${userId}`, {
  method: "GET",
});

function calculateLevel(xp) {
  const baseXP = 100; // XP nécessaire pour passer du niveau 1 au niveau 2
  const level = Math.floor(Math.log(xp / baseXP) / Math.log(1.5)) + 1;
  return level > 0 ? level : 1;
}

function xpForNextLevel(currentXP) {
  const baseXP = 100; // XP nécessaire pour passer du niveau 1 au niveau 2
  const currentLevel = calculateLevel(currentXP);
  const nextLevelXP = baseXP * Math.pow(1.5, currentLevel);
  return Math.ceil(nextLevelXP - currentXP);
}

console.log(user.xp);
console.log(xpForNextLevel(user.xp));

userLevel.value = calculateLevel(user.xp);

console.log(`Niveau de l'utilisateur : ${userLevel.value}`);
</script>
