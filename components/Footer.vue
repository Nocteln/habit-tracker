<template>
  <div class="bottom-0 w-full">
    <!--fixed-->
    <svg viewBox="0 0 1440 120" class="">
      <path
        fill="#219EBC"
        fill-opacity="1"
        d="M0,32L48,53.3C96,75,192,117,288,117.3C384,117,480,75,576,69.3C672,64,768,96,864,101.3C960,107,1056,85,1152,80C1248,75,1344,85,1392,90.7L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
      ></path>
    </svg>
    <div
      class="flex justify-around items-center bg-pacific-blue-500 text-center p-2"
    >
      <h1 class="font-bold text-2xl">
        <NuxtLink to="/">MyDailyTracking</NuxtLink>
      </h1>
      <div class="flex justify-between items-center gap-5">
        <ul>
          <li><NuxtLink to="/app/habits">My habits</NuxtLink></li>
          <li><NuxtLink to="/app/profile">My profile</NuxtLink></li>
          <li><NuxtLink to="/app/friends">My friends</NuxtLink></li>
          <li><NuxtLink to="/app">Home</NuxtLink></li>
        </ul>
        <ul>
          <li><NuxtLink to="/legal-mentions">legal mentions</NuxtLink></li>
          <li><NuxtLink to="/policy">policy terms</NuxtLink></li>
        </ul>
      </div>
    </div>
    <h5 class="bg-pacific-blue-400 text-sm text-center">
      Made with ❤️ by <a href="https://nocteln.fr" target="_blank">Nocteln</a>
    </h5>
  </div>
</template>
