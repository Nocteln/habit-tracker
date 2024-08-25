<template>
  <div
    class="my-5 p-5 bg-[#1D2130] w-[80vw] sm:w-full rounded-lg items-center justify-between flex flex-col sm:flex-row"
    :class="`${isAProfileDisplay ? 'rounded-lg' : 'md:rounded-r-none'}`"
  >
    <div
      class="flex items-center justify-center sm:justify-start space-x-4 sm:ml-5"
    >
      <UIcon
        :name="`i-heroicons-${goal.icon}`"
        class="text-3xl"
        dynamic
        :class="`text-${goal.iconColor}`"
      />
      <div class="flex items-center">
        <UIcon name="i-heroicons-fire" class="text-2xl text-orange-400 mr-1" />
        <h1 class="text-lg">{{ streak }}</h1>
      </div>
    </div>
    <div class="text-center flex-1 mx-4">
      <h1 class="font-bold text-2xl truncate">{{ goal.name }}</h1>
      <p class="p-2">{{ goal.description }}</p>
    </div>
    <div
      class="flex flex-wrap gap-3 items-center justify-center md:space-x-4 pt-3 sm:pt-0 md:mr-5"
      v-if="!isAProfileDisplay"
    >
      <UButton
        class="px-10 font-bold md:px-10"
        :disabled="AlreadyDone"
        @click="doneToday"
      >
        <span v-if="!loadingComplete">Done</span>
        <UIcon
          name="i-heroicons-arrow-path"
          class="animate-spin text-xl text-slate-800"
          v-else
        />
      </UButton>
      <UButton
        class="px-10 font-bold md:px-10"
        @click="deleteGoal"
        color="orange"
      >
        <span v-if="!AskDeleteConfirmation">Delete</span>
        <span v-else>Are you sure?</span>
      </UButton>
      <UButton
        color="blue"
        class="px-10 font-bold md:px-10"
        @click="MoreModalOpen = true"
      >
        <span>More</span>
      </UButton>
    </div>
    <UModal v-model="MoreModalOpen" :prevent-close="preventClosing">
      <MoreHabitModal
        @adding="preventClosing = true"
        @added="preventClosing = false"
        :goal="goal"
      />
    </UModal>
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";
import MoreHabitModal from "./modals/MoreHabitModal.vue";

const { goal, userXp, isAProfileDisplay } = defineProps([
  "goal",
  "userXp",
  "isAProfileDisplay",
]);
const toast = useToast();

const userStore = useUserStore();

const emit = defineEmits(["updateGoal", "isNewLevel"]);

const AlreadyDone = ref(false);
const streak = ref(goal.streak);

const loadingComplete = ref(false);

const AskDeleteConfirmation = ref(false);

const MoreModalOpen = ref(false);
const preventClosing = ref(false);

const today = new Date();
today.setHours(0, 0, 0, 0); // Réinitialise l'heure à minuit pour comparer uniquement la date
const lastActivity = new Date(goal.lastActivity);
lastActivity.setHours(0, 0, 0, 0); // Réinitialise aussi l'heure à minuit

if (today.getTime() === lastActivity.getTime()) {
  AlreadyDone.value = true;
}
const daysDiff = Math.floor(
  (today.getTime() - lastActivity.getTime()) / (1000 * 3600 * 24)
);
if (daysDiff > 1) {
  streak.value = 0; // Réinitialise la streak si plus d'un jour s'est écoulé
}
await $fetch("/api/goal/update", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    id: goal._id,
    streak: streak.value,
  }),
});
// lastActivity: new Date().toISOString(),

const doneToday = async () => {
  loadingComplete.value = true;
  const newGoal = {
    lastActivity: new Date().toISOString(),
    streak: streak.value + 1,
    id: goal._id,
  };

  userStore.incrementChallengeCountStreak(4, streak.value + 1);
  userStore.incrementChallengeCountStreak(5, streak.value + 1);
  userStore.incrementChallengeCount(1);
  userStore.incrementChallengeCount(7);

  const res = await $fetch("/api/goal/complete", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newGoal),
  });

  const isNewLevel = await addXp(userXp, Math.floor(Math.random() * 30) + 1);

  if (isNewLevel) {
    emit("isNewLevel", isNewLevel);
  }

  AlreadyDone.value = true;
  streak.value = goal.streak + 1;

  emit("updateGoal", goal);
  toast.add({
    id: goal._id,
    title: "Congratulations!",
    description: `Congrats for completing ${goal.name} today!`,
  });
  loadingComplete.value = false;
};

async function deleteGoal() {
  if (!AskDeleteConfirmation.value) {
    AskDeleteConfirmation.value = true;
    return;
  }

  loadingComplete.value = true;
  // await $fetch(`/api/goal/${goal._id}`, {
  //   method: "DELETE",
  // });
  emit("removeGoal", goal._id);
  toast.add({
    id: goal._id,
    title: "Goal deleted",
    description: `The goal "${goal.name}" has been deleted`,
  });
  AskDeleteConfirmation.value = false;
  loadingComplete.value = false;
}

// console.log(goal);
</script>
