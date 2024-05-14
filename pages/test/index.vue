<script setup lang="ts">
import { EditUserInfoModal } from "#components";

const isOpen = ref(false);
</script>

<template>
  <div>
    <UButton label="Open" @click="isOpen = true" />
    <UModal v-model="isOpen">
      <EditUserInfoModal />
    </UModal>
  </div>
</template>
