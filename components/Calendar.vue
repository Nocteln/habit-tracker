<template>
  <table class="table-auto text-black-500 bg-black w-full border-2">
    <thead>
      <tr class="border-2">
        <th>Name</th>
        <th>Date Started</th>
        <th>Streak</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody v-for="goal in fakeGoals">
      <Goal
        :name="goal.name"
        :dateStart="goal.dateStart"
        :dateEnd="goal.dateEnd"
        :streak="goal.streak"
        :lastActivity="goal.lastActivity"
        @delete="handleDelete"
        @edit="handleEdit"
        @complete="handleComplete"
      />
    </tbody>
  </table>
</template>

<script>
import { fakeGoals } from "../data/fakeGoals.js";
console.log(fakeGoals);
function handleDelete() {
  console.log("delete");
}

function handleEdit() {
  console.log("edit");
}

function handleComplete() {
  console.log("complete");
}
</script>
