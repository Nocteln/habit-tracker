<script setup lang="ts">
const { signIn, data } = useAuth();

function handleGoogle() {
  signIn("google");
}

function handleDiscord() {
  signIn("discord");
}

definePageMeta({
  middleware: "login",
});
</script>

<template>
  <div class="text-center h-[50vh]">
    <h1 class="text-3xl font-bold py-5 text-slate-50">sign in / register</h1>

    <div class="flex item-center justify-center m-5 pt-12">
      <button
        @click="handleGoogle"
        class="bg-green-400 hover:bg-green-500 hover:font-bold p-8 md:p-12 flex justify-center items-center flex-col"
      >
        with google
        <Img src="logo_google.png" class="h-12 hidden md:block pt-5" />
      </button>
      <button
        @click="handleDiscord"
        class="bg-blue-400 hover:bg-blue-500 hover:font-bold p-8 md:p-12 flex justify-center items-center flex-col"
      >
        with discord
        <Img src="logo_discord.png" class="h-12 hidden md:block" />
      </button>
    </div>
  </div>
</template>
