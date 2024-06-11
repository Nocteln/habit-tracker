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
  <GoalList v-if="!isLoading" :goalsToDo="goalsToDo" :goalsDone="goalsDone" />
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

const today = new Date();
const formattedTodayDate = today.toISOString().split("T")[0];

for (let i = 0; i < goals.data.value.length; i++) {
  if (goals.data.value[i].lastActivity !== formattedTodayDate) {
    goalsToDo.value.push(goals.data.value[i]);
  } else {
    goalsDone.value.push(goals.data.value[i]);
  }
}

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

<style lang="scss" scoped></style>
