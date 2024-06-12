<template>
  <h1>hey {{ data?.user?.name }}</h1>
  <UModal v-model="AddHabitOpen">
    <AddHabitModal @added="handleAddClose" />
  </UModal>

  <UButton
    @click="AddHabitOpen = true"
    class="my-2 px-5"
    icon="i-heroicons-pencil-square"
    >Add a goal!</UButton
  >
  <GoalList
    v-if="!isLoading"
    :goals="goals"
    :goalsToDo="goalsToDo"
    :goalsDone="goalsDone"
  />
  <p v-else>Loading</p>
</template>

<script setup>
import AddHabitModal from "~/components/modals/AddHabitModal.vue";

const isLoading = ref(true);
const goalsToDo = ref([]);
const goalsDone = ref([]);

const { data } = useAuth();

const userId = data.value.user.id;

const goals = await useFetch(`/api/goal/${userId}`, {
  method: "GET",
}).then((isLoading.value = false));

const AddHabitOpen = ref(false);

function handleAddClose(e) {
  console.log("e", e);
  AddHabitOpen.value = false;
  // console.log("ajt", e);
  goalsToDo.value.push(e);
  console.log(goalsToDo.value);
  console.log("close");
}

definePageMeta({
  middleware: "need-to-be-identified",
});
</script>
