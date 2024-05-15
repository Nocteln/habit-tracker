<script setup lang="ts">
const { signIn, data } = useAuth();

function handleGoogle() {
  signIn("google");
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
  <div v-if="data">
    {{ data }}
  </div>
  <div v-else>pas de data</div>
</template>
