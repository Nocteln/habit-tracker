<template>
  <div
    class="bg-[#1D2130] text-white w-full rounded-t-[15px] pt-[75px] px-8 md:px-[50px] lg:px-[125px] pb-[7px] z-50"
  >
    <div
      class="flex flex-col-reverse md:flex-row justify-evenly items-center gap-[30px] md:gap-0"
    >
      <div class="flex flex-col w-full md:w-[30vw] gap-[30px]">
        <img
          src="/logo_base.png"
          alt="logo"
          class="w-[60px] h-[60px] mx-auto md:mx-0 hidden md:block"
        />
        <h2 class="text-center md:text-left">
          MyDailyTracking is a web app that allows you to effectively track your
          habits.
        </h2>
        <h3 class="text-center md:text-left">
          MyDailyTracking © 2024 All rights reserved.
        </h3>
      </div>
      <div
        class="flex flex-col md:flex-row justify-around gap-[30px] md:gap-[114px] w-full md:w-auto"
      >
        <div class="flex flex-col items-center md:items-start">
          <h1 class="text-[25px] font-semibold">Useful Links</h1>
          <div class="flex flex-col text-[#ffffffcc] text-center md:text-left">
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
        <div class="flex flex-col items-center md:items-start">
          <h1 class="text-[25px] font-semibold">Legal Notices</h1>
          <div class="flex flex-col text-[#ffffffcc] text-center md:text-left">
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
