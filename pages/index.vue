<template>
  <div class="bg-[#8ECAE6] h-full w-full relative m-0">
    <Hero />
    <h1>{{ data.user.id }}</h1>
    <h1>{{ user.username }}</h1>
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";

const { data } = useAuth();

const user = useUserStore();
</script>
