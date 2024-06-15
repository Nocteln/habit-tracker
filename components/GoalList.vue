<template>
  <div class="flex flex-col">
    <div class="text-center">
      <h1 class="font-bold text-3xl underline pb-5">Goals to do</h1>
      <table
        class="table-fixed text-black-500 bg-black w-full border-2 text-white"
      >
        <thead>
          <tr class="border-2">
            <th>Name</th>
            <th>Date Started</th>
            <th>Streak 🔥</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody v-for="goal in goalsToDo">
          <Goal
            v-if="goal.lastActivity !== formattedTodayDate"
            :name="goal.name"
            :dateStart="goal.dateStart"
            :dateEnd="goal.dateEnd"
            :streak="goal.streak"
            :lastActivity="goal.lastActivity"
            :_id="goal._id"
            @delete="handleDelete"
            @complete="handleComplete(goal)"
          />
        </tbody>
      </table>
    </div>

    <div class="text-center pt-20">
      <h1 class="font-bold text-3xl underline pb-5">Goals done today</h1>
      <table
        class="table-fixed text-black-500 bg-black w-full border-2 text-white"
      >
        <thead>
          <tr class="border-2">
            <th>Name</th>
            <th>Date Started</th>
            <th>Streak 🔥</th>
            <th class="max-w-[30vw]">Actions</th>
          </tr>
        </thead>
        <tbody v-for="goal in goalsDone">
          <Goal
            v-if="goal.lastActivity == formattedTodayDate"
            :name="goal.name"
            :dateStart="goal.dateStart"
            :dateEnd="goal.dateEnd"
            :streak="goal.streak"
            :lastActivity="goal.lastActivity"
            :_id="goal._id"
            @delete="handleDelete"
            @complete="handleComplete(goal)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const { goals, goalsToDo, goalsDone } = defineProps([
  "goals",
  "goalsToDo",
  "goalsDone",
]);

const today = new Date();
const formattedTodayDate = today.toISOString().split("T")[0];

function handleComplete(updatedGoal) {
  console.log(updatedGoal);
  // Retirer l'objectif de la liste "goalsToDo"
  const index = goalsToDo.findIndex((goal) => goal._id === updatedGoal._id);
  if (index > -1) {
    goalsToDo.splice(index, 1);
  }

  // Ajouter l'objectif à la liste "goalsDone"
  goalsDone.push(updatedGoal);
}

try {
  for (let i = 0; i < goals.data.value.length; i++) {
    if (goals.data.value[i].lastActivity !== formattedTodayDate) {
      goalsToDo.push(goals.data.value[i]);
    } else {
      goalsDone.push(goals.data.value[i]);
    }
  }
} catch (e) {}

async function handleDelete(id) {
  console.log("delete");
  await $fetch(`http://localhost:3000/api/goal/${id}`, {
    method: "DELETE",
  });

  goalsToDo = goalsToDo.filter((goal) => goal._id !== id);
  goalsDone = goalsDone.filter((goal) => goal._id !== id);
}
</script>
