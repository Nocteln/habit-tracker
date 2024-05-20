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
    <tbody v-for="goal in goals">
      <Goal
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
</template>

<script setup>
const { goals } = defineProps(["goals"]);

function handleDelete() {
  console.log("delete");
}

function handleEdit() {
  console.log("edit");
}
</script>
