<template>
  <div
    class="bg-[#1D2130] text-white w-full rounded-t-[15px] pt-[75px] px-[125px] pb-[7px]"
  >
    <div class="flex justify-evenly items-center">
      <div class="flex flex-col w-[30vw] gap-[30px]">
        <img src="/logo_base.png" alt="logo" class="w-[60px] h-[60px]" />
        <h2>
          MyDailyTracking is a web app that allows you to effectively track your
          habits.
        </h2>
        <h3>MyDailyTracking © 2024 All rights reserved.</h3>
      </div>
      <div class="flex justify-around gap-[114px]">
        <div>
          <h1 class="text-[25px] font-semibold">Useful Links</h1>
          <div class="flex flex-col text-[#ffffffcc]">
            <NuxtLink to="/login" class="hover:text-white transition"
              >Login</NuxtLink
            >
            <NuxtLink to="/app/profile" class="hover:text-white transition"
              >My Profile</NuxtLink
            >
            <NuxtLink to="/app/habits" class="hover:text-white transition"
              >My Habits</NuxtLink
            >
            <NuxtLink to="/leaderboard" class="hover:text-white transition"
              >Leaderboard</NuxtLink
            >
          </div>
        </div>
        <div class="flex flex-col">
          <h1 class="text-[25px] font-semibold">Legal Notices</h1>
          <div class="flex flex-col text-[#ffffffcc]">
            <NuxtLink to="/legal-mentions" class="hover:text-white transition"
              >Terms of Use</NuxtLink
            >
            <NuxtLink to="/policy " class="hover:text-white transition"
              >Privacy Policy</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
    <div class="h-[1px] bg-white mt-[25px]" />
    <h1 class="text-center pt-8">Made with ❤️ by Nocteln</h1>
  </div>
</template>
