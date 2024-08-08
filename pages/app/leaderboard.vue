<template>
  <div class="text-center flex flex-col items-center min-h-[60vh]">
    <h2 class="text-3xl m-5 font-bold">Leaderboard</h2>
    <div
      class="flex bg-[#023047] p-2 m-1 w-[50vw] justify-evenly items-center rounded-t-lg"
    >
      <h1>Position</h1>
      <h1>Username</h1>
      <h1>Level</h1>
    </div>
    <div v-for="(user, index) in data.users" :key="user._id">
      <LbUser :user="user" :position="index + 1" />
    </div>
  </div>
</template>

<script setup>
const { data } = useFetch("/api/user/leaderboard");
</script>
