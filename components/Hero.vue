<template>
  <div
    class="h-[50vh] flex flex-col justify-center items-center text-5xl gap-5"
  >
    <h1>Adoptez de nouvelles habitudes!</h1>
    <UButton color="sky" size="xl"
      ><NuxtLink to="login" v-if="status !== 'authenticated'"
        >Inscrivez vous!</NuxtLink
      >
      <NuxtLink to="app" v-else>Acceder à l'application!</NuxtLink>
    </UButton>
  </div>
</template>

<script setup>
const { status } = useAuth();
</script>
