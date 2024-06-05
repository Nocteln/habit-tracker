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
  <GoalList v-if="!isLoading" :goals="goals" />
  <p v-else>Loading</p>
</template>

<script setup>
import AddHabitModal from "~/components/modals/AddHabitModal.vue";

const isLoading = ref(true);

const { data } = useAuth();

const goals = await $fetch(`/api/goal/${data.value.user.id}`, {
  method: "GET",
}).then((isLoading.value = false));

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
