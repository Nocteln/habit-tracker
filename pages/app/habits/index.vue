<template>
  <div class="text-center flex flex-col items-center">
    <GoalsNav @sort="sort" @search="searchGoal" />
    <div class="text-center">
      <UModal v-model="AddHabitOpen" :prevent-close="preventClosing">
        <AddHabitModal
          @added="handleAddClose"
          @adding="preventClosing = true"
        />
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
          <span
            @click="AddHabitOpen = true"
            class="text-green-500 cursor-pointer"
            >adding</span
          >
          some
        </h1>
      </div>

      <div
        v-if="isLoading"
        class="flex justify-center items-center text-center"
      >
        <UIcon
          name="i-heroicons-arrow-path"
          dynamic
          class="animate-spin text-5xl"
        />
      </div>

      <div
        v-for="goal in filteredGoals"
        :key="goal.name"
        class="flex flex-col justify-center items-center"
      >
        <Goal :goal="goal" @updateGoal="updatedGoal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import AddHabitModal from "~/components/modals/AddHabitModal.vue";

const AddHabitOpen = ref(false);
const { data } = useAuth();
const toast = useToast();
const isLoading = ref(true);
const preventClosing = ref(false);
const noGoals = ref(true);
const searchQuery = ref("");

const today = new Date();
today.setHours(0, 0, 0, 0);

const userId = data.value.user.id;

const goals = await useFetch(`/api/goal/list?userId=${userId}`, {
  method: "GET",
}).then((isLoading.value = false));

const allGoals = ref([...goals.data.value]);

for (let i = 0; i < allGoals.value.length; i++) {
  const lastActivity = new Date(allGoals.value[i].lastActivity);
  lastActivity.setHours(0, 0, 0, 0);
  noGoals.value = false;
}

const filteredGoals = computed(() => {
  let goals = allGoals.value;
  if (searchQuery.value) {
    goals = goals.filter((goal) =>
      goal.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return goals.sort((a, b) => {
    const lastActivityA = new Date(a.lastActivity);
    const lastActivityB = new Date(b.lastActivity);
    lastActivityA.setHours(0, 0, 0, 0);
    lastActivityB.setHours(0, 0, 0, 0);

    if (
      lastActivityA.getTime() === today.getTime() &&
      lastActivityB.getTime() !== today.getTime()
    ) {
      return 1; // A est fait aujourd'hui, B ne l'est pas
    }
    if (
      lastActivityA.getTime() !== today.getTime() &&
      lastActivityB.getTime() === today.getTime()
    ) {
      return -1; // B est fait aujourd'hui, A ne l'est pas
    }
    return 0;
  });
});

function searchGoal(e) {
  searchQuery.value = e;
}

function handleAddClose(e) {
  AddHabitOpen.value = false;
  allGoals.value.unshift(e);
  noGoals.value = false;
  toast.add({
    id: "ajout goal",
    title: "Succes",
    description: `The goal ${e.name} has successfully been added`,
  });
  preventClosing.value = false;
}

function updatedGoal(updatedGoal) {
  const index = allGoals.value.findIndex((g) => g._id === updatedGoal._id);
  if (index !== -1) {
    allGoals.value[index] = updatedGoal;
  }
}

function sort(event) {
  allGoals.value.sort((a, b) => {
    switch (event) {
      case "aToz":
        return a.name.localeCompare(b.name);
      case "zToa":
        return b.name.localeCompare(a.name);
      case "date":
        return new Date(b.lastActivity) - new Date(a.lastActivity);
      case "streak":
        return b.streak - a.streak;
      default:
        return a.name.localeCompare(b.name);
    }
  });
}
</script>
