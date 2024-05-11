<script setup lang="ts">
import { EditUserInfoModal } from "#components";

const modal = useModal();

function openEditModal() {
  console.log("openEditModal");
  modal.open(EditUserInfoModal);
}
</script>
<template>
  <UButton :onClick="openEditModal">Open</UButton>
  <button @click="openEditModal">Open</button>
</template>
