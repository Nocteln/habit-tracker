<template>
  <h1>hey {{ data?.user?.name }}</h1>

  <AddHabitModal />
  <EditUserInfoModal />
</template>

<script setup>
import AddHabitModal from "~/components/modals/AddHabitModal.vue";
import EditUserInfoModal from "~/components/modals/EditUserInfoModal";
const { data } = useAuth();
</script>

<style lang="scss" scoped></style>
