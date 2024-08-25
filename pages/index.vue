<script setup>
import NewFeatures from "~/components/landingPage/NewFeatures.vue";
import NewHero from "~/components/landingPage/NewHero.vue";
import NewHowItWorks from "~/components/landingPage/NewHowItWorks.vue";
import Pricing from "~/components/landingPage/Pricing.vue";

// import NewNavBar from "~/components/new/NewNavBar.vue";
definePageMeta({
  layout: "landing-page",
});
</script>

<template>
  <div class="bg-white">
    <NewHero />
    <NewHowItWorks />
    <NewFeatures />
    <Pricing />
    <div class="text-center relative pb-24 flex flex-col items-center">
      <h1 class="text-black text-[48px] font-semibold pb-[60px] z-20">
        So? What are you waiting for?
      </h1>
      <button
        @click="navigateTo('/login')"
        class="bg-[#1D213ff0] hover:bg-[#1D2130cc] w-[30vw] text-[#fff] px-4 py-2 rounded-[12px] z-20 transition"
      >
        Join us!
      </button>
      <div
        class="w-[60vw] h-[20vh] bg-gradient-to-r from-[#373FFF] to-[#3ACAF8] rounded-full absolute blur-3xl bottom-[5vh]"
      ></div>
    </div>
  </div>
</template>
