<script setup lang="ts">
import Feature from "./Feature.vue";
</script>

<template>
  <div
    class="bg-white text-[#1D2130] text-center items-center flex flex-col pt-12 pb-12"
    id="features"
  >
    <h1
      class="text-[24px] bg-gradient-to-r from-[#373FFF] to-[#3ACAF8] inline-block text-transparent bg-clip-text font-bold"
    >
      FEATURES
    </h1>
    <p class="mt-[35px] text-[30px] w-[40vw] font-bold">Our fonctionalites</p>
    <div
      class="flex flex-wrap items-center justify-center gap-[94px] gap-y-[60px] pt-[94px]"
    >
      <Feature
        name="Habit Management"
        description="The main feature that allows you to add, edit, and sort your habits"
        image="/habit_page.png"
      />
      <Feature
        name="Public/Private Profile
        "
        description=" Share your progress through your profile!"
        image="/public_profile_page.png"
      />
      <Feature
        name="Discussion Forum"
        description="Share your thoughts, progress, and much more through the integrated chat!
        "
        image="/chat_page.png"
      />
      <Feature
        name="Leaderboard"
        description="Earn XP by completing your goals and challenges to climb the leaderboard!
  
  
  "
        image="/leaderboard_page.png"
      />
    </div>
  </div>
</template>
