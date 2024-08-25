<script setup>
import NewFeatures from "~/components/navbar/NewFeatures.vue";
import NewFooter from "~/components/navbar/NewFooter.vue";
import NewHero from "~/components/navbar/NewHero.vue";
import NewHowItWorks from "~/components/navbar/NewHowItWorks.vue";
import NewNavBar from "~/components/navbar/NewNavBar.vue";
import Pricing from "~/components/navbar/Pricing.vue";

// import NewNavBar from "~/components/new/NewNavBar.vue";
definePageMeta({
  layout: "nothing",
});
</script>

<template>
  <div class="bg-white">
    <NewNavBar />
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
    <NewFooter />
  </div>
</template>
