<template>
  <div class="flex flex-col items-center">
    <UModal v-model="AddHabitOpen">
      <AddHabitModal @added="handleAddClose" />
    </UModal>

    <UButton
      @click="AddHabitOpen = true"
      class="my-5 px-32 py-5 text-2xl"
      icon="i-heroicons-pencil-square"
      >Add a goal!</UButton
    >
    <GoalList
      v-if="!isLoading"
      :goals="goals"
      :goalsToDo="goalsToDo"
      :goalsDone="goalsDone"
    />
    <p v-else class="h-64">Loading</p>
  </div>
</template>

<script setup>
import AddHabitModal from "~/components/modals/AddHabitModal.vue";

const isLoading = ref(true);
const goalsToDo = ref([]);
const goalsDone = ref([]);

const { data } = useAuth();
const toast = useToast();

const userId = data.value.user.id;

const goals = await useFetch(`/api/goal/${userId}`, {
  method: "GET",
}).then((isLoading.value = false));

const AddHabitOpen = ref(false);

function handleAddClose(e) {
  AddHabitOpen.value = false;
  goalsToDo.value.push(e);

  toast.add({
    id: "ajout goal",
    title: "Succes",
    description: `The goal ${e.name} has successfully been added`,
  });
}

definePageMeta({
  middleware: "need-to-be-identified",
});
</script>
