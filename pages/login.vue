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
  <div>sign in</div>

  <button @click="handleGoogle" class="bg-green-400">
    Register with google
  </button>
  <button @click="handleDiscord" class="bg-blue-400">
    Register with discord
  </button>
  <div v-if="data">
    {{ data }}
  </div>
  <div v-else>pas de data</div>
</template>
