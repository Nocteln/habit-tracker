<template>
  <div
    class="h-[85vh] sm:h-[90vh] flex flex-col justify-center items-center text-5xl gap-5"
  >
    <h1 class="font-bold">Master Your Routine, One Day at a Time!</h1>
    <h3 class="text-xl w-[70vw]">
      Join a community of habit builders and track your progress daily.
    </h3>
    <UButton size="xl" class="justify-center font-bold text-xl"
      ><NuxtLink
        to="login"
        class="h-[5vh] w-[40vw]"
        v-if="status !== 'authenticated'"
        >Join US !</NuxtLink
      >
      <NuxtLink to="app" class="h-[5vh] w-[40vw]" v-else
        >Go to the app!</NuxtLink
      >
    </UButton>
  </div>
</template>

<script setup>
const { status } = useAuth();
</script>
