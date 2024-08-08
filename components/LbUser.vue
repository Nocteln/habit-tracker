<template>
  <div class="flex bg-[#023047] p-2 m-0.5 w-[50vw] justify-evenly items-center">
    <h1 class="text-2xl">
      {{
        position === 1
          ? "🥇"
          : position === 2
          ? "🥈"
          : position === 3
          ? "🥉"
          : "#" + position
      }}
    </h1>
    <NuxtLink
      :to="`/app/user/${user.id}`"
      class="flex items-center cursor-pointer"
    >
      <img :src="user.image" width="25" class="mr-3 rounded-md" />
      <h1>{{ user.username }}</h1>
    </NuxtLink>
    <h1>{{ calculateLevel(user.xp) }}</h1>
  </div>
</template>

<script setup>
const { user, position } = defineProps(["user", "position"]);
</script>
