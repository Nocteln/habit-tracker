<template>
  <div
    class="text-center flex items-center md:items-start flex-col md:flex-row"
  >
    <!-- GoalsNav component placed in a column to the left on larger screens -->
    <div class="w-[90vw] md:w-1/6 md:sticky top-0">
      <GoalsNav
        @sort="sort"
        @search="searchGoal"
        @addGoal="AddHabitOpen = true"
      />
    </div>
    <div class="md:w-5/6 flex flex-col">
      <div class="items-center">
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
        >
          Add a goal!
        </UButton>
      </div>

      <div v-if="noGoals" class="flex flex-col items-center">
        <img src="/notFound.png" alt="No Goals" />
        <h1 class="text-slate-900 font-bold text-3xl">
          No goals found ?? Try
          <span
            @click="AddHabitOpen = true"
            class="text-green-500 cursor-pointer"
          >
            adding
          </span>
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
        <Goal
          :goal="goal"
          @updateGoal="updatedGoal"
          @isNewLevel="newLevel"
          @removeGoal="removeGoal"
          :userXp="userXp"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// TODO: ajouter les boutons : delete et edit
// TODO: ajouter le fait que l'on puisse afficher certains objectifs sur le profile

import AddHabitModal from "~/components/modals/AddHabitModal.vue";
import { useUserStore } from "~/store/user";
// import { useChallengeStore } from "~/store/challenges";

const userStore = useUserStore();

// const challengesStore = useChallengeStore();

const AddHabitOpen = ref(false);
const { data } = useAuth();
const toast = useToast();
const isLoading = ref(true);
const preventClosing = ref(false);
const noGoals = ref(true);
const searchQuery = ref("");
const showOnlyDoneToday = ref(false);
const sortingKey = ref("nothing");

const today = new Date();
today.setHours(0, 0, 0, 0);

const userId = data.value.user.id;
const user = await $fetch(`/api/user/${userId}`);

userStore.fetch(userId);
// challengesStore.fetchChallenges(userId);

const userXp = ref(user.xp);

const goals = await useFetch(`/api/goal/list?userId=${userId}`, {
  method: "GET",
}).then((response) => {
  isLoading.value = false;
  return response;
});

const allGoals = ref([...goals.data.value]);

if (allGoals.value.length > 0) {
  noGoals.value = false;
}
const filteredGoals = computed(() => {
  let goals = allGoals.value;

  if (searchQuery.value) {
    goals = goals.filter((goal) =>
      goal.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (showOnlyDoneToday.value) {
    return goals.filter((goal) => {
      const lastActivity = new Date(goal.lastActivity);
      lastActivity.setHours(0, 0, 0, 0);
      return lastActivity.getTime() === today.getTime();
    });
  }

  goals = goals.sort((a, b) => {
    if (sortingKey.value === "nothing") {
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
    }

    switch (sortingKey.value) {
      case "aToz":
        return a.name.localeCompare(b.name);
      case "zToa":
        return b.name.localeCompare(a.name);
      case "date":
        return new Date(b.lastActivity) - new Date(a.lastActivity);
      case "streak":
        return b.streak - a.streak;
      default:
        return 0;
    }
  });

  return goals;
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

function removeGoal(goalId) {
  const index = allGoals.value.findIndex((g) => g._id === goalId);
  if (index !== -1) {
    allGoals.value.splice(index, 1);
    if (allGoals.value.length === 0) {
      noGoals.value = true;
    }
  }
}

function sort(event) {
  sortingKey.value = event;
  showOnlyDoneToday.value = event === "doneToday";
}

function newLevel(level) {
  toast.add({
    id: "nouveau level",
    title: "Nouveau niveau",
    description: `Congratulations! You reached level ${level}!`,
  });
}
</script>
