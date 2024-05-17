<template>
  <h1>hey {{ data?.user?.name }}</h1>
  <UModal v-model="idAddHabitOpen">
    <AddHabitModal @added="handleAddClose" />
  </UModal>

  <UButton
    @click="idAddHabitOpen = true"
    class="my-2 px-5"
    icon="i-heroicons-pencil-square"
    >Add a goal!</UButton
  >
  <Calendar />
</template>

<script setup>
import AddHabitModal from "~/components/modals/AddHabitModal.vue";
import { fakeGoals } from "~/data/fakeGoals";

const { data } = useAuth();

const idAddHabitOpen = ref(false);

function handleAddClose() {
  idAddHabitOpen.value = false;
  console.log("close");
}

definePageMeta({
  middleware: "need-to-be-identified",
});
</script>

<style lang="scss" scoped></style>
