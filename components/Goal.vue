<template>
  <tr class="border-2 m-5 p-5 justify-evenly text-black-500 text-center">
    <td>{{ name }}</td>
    <td>{{ dateStartFormated }}</td>
    <td>{{ streak }}</td>
    <td>{{ dateStart }}</td>
    <td>ccccccc</td>
  </tr>
</template>

<script setup>
console.log("cc");
const props = defineProps([
  "name",
  "dateEnd",
  "dateStart",
  "lastActivity",
  "streak",
]);

const emits = defineEmits(["delete", "edit", "complete"]);

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const dateStartFormated = new Date(props.dateStart).toLocaleDateString(
  "en-EN",
  options
);
</script>
