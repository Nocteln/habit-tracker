<template>
  <div class="text-center">
    <UModal v-model="AddHabitOpen">
      <AddHabitModal @added="handleAddClose" />
    </UModal>

    <UButton
      @click="AddHabitOpen = true"
      class="my-5 px-32 py-5 text-2xl"
      icon="i-heroicons-pencil-square"
      >Add a goal!</UButton
    >
    <div
      v-for="goal in goalsData"
      :key="goal.name"
      class="flex flex-col justify-center items-center"
    >
      <Goal
        :name="goal.name"
        :description="goal.description"
        :icon="goal.icon"
        :iconColor="goal.iconColor"
        :goal="goal"
      />
    </div>
  </div>
</template>

<script setup>
import AddHabitModal from "~/components/modals/AddHabitModal.vue";

const AddHabitOpen = ref(false);

const { data } = useAuth();
const toast = useToast();

const userId = data.value.user.id;

const goals = await useFetch(`/api/goal/list?userId=${userId}`, {
  method: "GET",
});
// // .then((isLoading.value = false))

// console.log(goals.data.value);
const goalsData = goals.data.value;
function handleAddClose(e) {
  AddHabitOpen.value = false;

  toast.add({
    id: "ajout goal",
    title: "Succes",
    description: `The goal ${e.name} has successfully been added`,
  });
}

// const goals = [
//   {
//     name: "appeler mamie",
//     description: "Rappeler mamie à 10h",
//     icon: "i-heroicons-phone",
//     streak: 3,
//     completed: false,
//     color: "text-blue-400",
//   },
//   {
//     name: "faire du sport",
//     description: "Courir 5 km",
//     icon: "i-heroicons-paper-airplane",
//     streak: 7,
//     completed: true,
//     color: "text-green-400",
//   },
//   {
//     name: "apprendre React",
//     description: "Suivre un cours sur React pendant 1h",
//     icon: "i-heroicons-academic-cap",
//     streak: 5,
//     completed: false,
//     color: "text-purple-400",
//   },
//   {
//     name: "pratiquer le piano",
//     description: "Jouer du piano pendant 30 minutes",
//     icon: "i-heroicons-musical-note",
//     streak: 2,
//     completed: false,
//     color: "text-red-400",
//   },
//   {
//     name: "étudier les maths",
//     description: "Réviser les chapitres sur les dérivées",
//     icon: "i-heroicons-book-open",
//     streak: 4,
//     completed: true,
//     color: "text-orange-400",
//   },
// ];
</script>
