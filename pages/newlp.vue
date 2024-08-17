<script setup>
import NewFeatures from "~/components/navbar/NewFeatures.vue";
import NewHero from "~/components/navbar/NewHero.vue";
import NewHowItWorks from "~/components/navbar/NewHowItWorks.vue";
import NewNavBar from "~/components/navbar/NewNavBar.vue";

// import NewNavBar from "~/components/new/NewNavBar.vue";
definePageMeta({
  layout: "nothing",
});
</script>

<template>
  <NewNavBar />
  <NewHero />
  <NewHowItWorks />
  <NewFeatures />
</template>
