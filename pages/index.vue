<template>
  <div class="bg-[#8ECAE6] h-full">
    <NavBar />
    <Hero />
    <NuxtLink to="/api/login" external> Sign in </NuxtLink>
    <NuxtLink to="/api/logout" external> Sign out </NuxtLink>
    <p v-if="$auth.loggedIn">I'm signed in!</p>
    <p v-else>I'm signed out :(</p>

    <p>{{ $auth.user }}</p>
  </div>
</template>

<script setup></script>

<style scoped></style>
