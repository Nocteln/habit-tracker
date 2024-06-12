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
  {{ goals }}
  <GoalList v-if="!isLoading" :goals="goals" />
  <p v-else>Loading</p>
</template>

<script setup>
import AddHabitModal from "~/components/modals/AddHabitModal.vue";

const isLoading = ref(true);

const { data } = useAuth();

const userId = data.value.user.id;
console.log("userid", userId);
const goals = await useFetch(`/api/goal/${userId}`, {
  method: "GET",
}).then((isLoading.value = false));

// console.log("goalssss", goals);

const idAddHabitOpen = ref(false);

function handleAddClose(e) {
  idAddHabitOpen.value = false;
  // console.log("ajt", e);
  goalsToDo.value.push(e);
  console.log(goalsToDo.value);
  console.log("close");
}

definePageMeta({
  middleware: "need-to-be-identified",
});
</script>
