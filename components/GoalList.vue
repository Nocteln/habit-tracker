<template>
  <div class="flex flex-col">
    <div class="text-center">
      <h1 class="font-bold text-3xl underline pb-5">Goals to do</h1>
      <table
        class="table-fixed text-black-500 bg-black w-full border-2 text-white fixed"
      >
        <thead>
          <tr class="border-2">
            <th>Name</th>
            <th>Date Started</th>
            <th>Streak 🔥</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody v-for="goal in goals">
          <Goal
            v-if="goal.lastActivity !== formattedTodayDate"
            :name="goal.name"
            :dateStart="goal.dateStart"
            :dateEnd="goal.dateEnd"
            :streak="goal.streak"
            :lastActivity="goal.lastActivity"
            :_id="goal._id"
            @delete="handleDelete"
            @edit="handleEdit"
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
        <tbody v-for="goal in goals">
          <Goal
            v-if="goal.lastActivity == formattedTodayDate"
            :name="goal.name"
            :dateStart="goal.dateStart"
            :dateEnd="goal.dateEnd"
            :streak="goal.streak"
            :lastActivity="goal.lastActivity"
            :_id="goal._id"
            @delete="handleDelete"
            @edit="handleEdit"
            @complete="handleComplete(goal)"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const { goals } = defineProps(["goals"]);

const today = new Date();
const formattedTodayDate = today.toISOString().split("T")[0];
console.log(formattedTodayDate);

async function handleDelete(id) {
  console.log("delete");
  await useFetch(`/api/goal/${id}`, {
    method: "DELETE",
  });
}

function handleEdit() {
  console.log("edit");
}
</script>
