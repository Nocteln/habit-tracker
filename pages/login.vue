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
  <div class="text-center">
    <h1 class="text-3xl font-bold py-5 text-slate-50">sign in / register</h1>

    <div class="flex item-center justify-center m-5 pt-12">
      <button
        @click="handleGoogle"
        class="bg-green-400 hover:bg-green-500 text-xl hover:font-bold p-8 md:p-12 md:m-4 flex justify-center items-center flex-col transition hover:scale-95 hover:rotate-3"
      >
        with google
        <Img src="logo_google.png" class="h-12 hidden md:block pt-5" />
      </button>
      <button
        @click="handleDiscord"
        class="bg-blue-400 hover:bg-blue-500 text-xl hover:font-bold p-8 md:p-12 md:m-4 flex justify-center items-center flex-col transition hover:scale-95 hover:rotate-3"
      >
        with discord
        <Img src="logo_discord.png" class="h-12 hidden md:block" />
      </button>
    </div>

    <h1 class="text-3xl pt-12">Avantages :</h1>

    <div class="md:flex">
      <InfoCard
        bgColor="bg-yellow-400"
        text="Create new habits"
        icon="i-heroicons-plus-circle"
      />
      <InfoCard
        bgColor="bg-red-400"
        text="Share your progress"
        icon="i-heroicons-share"
      />
      <InfoCard
        bgColor="bg-purple-400"
        text="Complete challenges"
        icon="i-heroicons-trophy"
      />
    </div>
  </div>
</template>
