<template>
  <div>
    <h1>User Profile</h1>
    <p>User ID: {{ userId }}</p>
    <!-- Affiche plus de détails sur l'utilisateur ici -->
  </div>
</template>

<script setup>
const route = useRoute();
const userId = route.params.userId;
</script>
