<template>
  <div class="text-center">
    <UModal v-model="AddHabitOpen" :prevent-close="preventClosing">
      <AddHabitModal @added="handleAddClose" @adding="preventClosing = true" />
    </UModal>

    <UButton
      @click="AddHabitOpen = true"
      class="my-5 px-32 py-5 text-2xl"
      icon="i-heroicons-pencil-square"
      >Add a goal!</UButton
    >

    <div v-if="noGoals" class="flex flex-col items-center">
      <img src="/notFound.png" alt="No Goals" />
      <h1 class="text-slate-900 font-bold text-3xl">
        No goals found ?? Try
        <span @click="AddHabitOpen = true" class="text-green-500 cursor-pointer"
          >adding</span
        >
        some
      </h1>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center text-center">
      <Icon name="i-heroicons-arrow-path" class="animate-spin" size="50" />
    </div>
    <div
      v-for="goal in goalsData"
      :key="goal.name"
      class="flex flex-col justify-center items-center"
    >
      <Goal :goal="goal" @updateGoal="updatedGoal" />
    </div>

    <div
      v-for="goal in goalsDone"
      :key="goal.name"
      class="flex flex-col justify-center items-center"
    >
      <Goal :goal="goal" />
    </div>
  </div>
</template>

<script setup>
import AddHabitModal from "~/components/modals/AddHabitModal.vue";

const AddHabitOpen = ref(false);

const { data } = useAuth();
const toast = useToast();
const isLoading = ref(true);
const goalsDone = ref([]);
const preventClosing = ref(false);

const noGoals = ref(true);

const today = new Date();
today.setHours(0, 0, 0, 0);

const userId = data.value.user.id;

const goals = await useFetch(`/api/goal/list?userId=${userId}`, {
  method: "GET",
}).then((isLoading.value = false));

const goalsData = ref(goals.data.value);

for (let i = 0; i < goalsData.value.length; i++) {
  const lastActivity = new Date(goalsData.value[i].lastActivity);
  lastActivity.setHours(0, 0, 0, 0);

  if (today.getTime() === lastActivity.getTime()) {
    goalsDone.value.push(goalsData.value[i]);
  }

  noGoals.value = false;
}

goalsData.value = goalsData.value.filter((goal) => {
  const lastActivity = new Date(goal.lastActivity);
  lastActivity.setHours(0, 0, 0, 0);
  return today.getTime() !== lastActivity.getTime();
});

function handleAddClose(e) {
  AddHabitOpen.value = false;

  goalsData.value.push(e);

  noGoals.value = false;

  toast.add({
    id: "ajout goal",
    title: "Succes",
    description: `The goal ${e.name} has successfully been added`,
  });
  preventClosing.value = false;
}

function updatedGoal(goal) {
  goalsDone.value.push(goal);
  goalsData.value = goalsData.value.filter((g) => g._id !== goal._id);
}
</script>
