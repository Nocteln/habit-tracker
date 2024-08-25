<template>
  <div
    class="bg-[#fff] text-[#1D2130] flex flex-col items-center text-center pt-[120px]"
  >
    <div>
      <h1 class="text-3xl font-bold">
        Master Your Routine. One Day at a Time!
      </h1>
      <p class="text-sm">
        Join a community of habit builders and track your progress daily.
      </p>
    </div>
    <!-- <div class="p-5 shadow-lg shadow-cyan-500/50" /> -->
    <div class="mt-[60px] mb-[61px] z-20">
      <button
        @click="navigateTo('/login')"
        class="bg-[#1D2130] hover:bg-[#1D2130cc] w-[30vw] text-[#fff] px-4 py-2 rounded-[12px] z-20 transition"
      >
        Join us today!
      </button>
    </div>
    <img
      src="/habit_page.png"
      alt="page des habitudes"
      width="1024"
      height="666"
      class="rounded-[40px] z-20 max-w-[90vw]"
    />
    <div
      class="w-56 h-56 bg-gradient-to-r from-[#373FFF] to-[#3ACAF8] rounded-full absolute blur-3xl top-[50vh]"
    ></div>
  </div>
</template>
