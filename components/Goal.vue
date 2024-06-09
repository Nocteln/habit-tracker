<template>
  <tr
    class="border-2 m-5 p-5 justify-evenly text-black-500 text-center text-white"
  >
    <td>{{ name }}</td>
    <td>{{ dateStartFormated }}</td>
    <td>{{ currentStreak }}</td>
    <td class="flex justify-evenly">
      <UButton :disabled="isToday" @click="handleComplete">
        <UIcon name="i-heroicons-document-check" /> Done Today
      </UButton>
      <!-- <UButton @click="handleEdit" color="blue"
        ><UIcon name="i-heroicons-pencil-square" /> Edit</UButton
      > -->
      <UButton @click="handleDelete(props._id)" color="red"
        ><UIcon name="i-heroicons-trash" /> Delete</UButton
      >
    </td>
  </tr>
</template>

<script setup>
const props = defineProps([
  "name",
  "dateEnd",
  "dateStart",
  "lastActivity",
  "streak",
  "_id",
]);

const emits = defineEmits(["delete", "complete"]);

const isToday = ref(false);

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

function parseDate(dateStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // Les mois sont indexés à partir de 0 en JavaScript
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois sont indexés à partir de 0
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getNextDay(dateStr) {
  const date = parseDate(dateStr);
  date.setDate(date.getDate() + 1); // Ajouter un jour
  return formatDate(date);
}

const today = new Date();
const formattedTodayDate = today.toISOString().split("T")[0];

if (formattedTodayDate === props.lastActivity) isToday.value = true;

const lastConnexionDate = parseDate(props.lastActivity);
// const newConnexionDate = getNextDay(props.lastActivity);

function calculateStreak() {
  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  const diffDays = Math.round((today - lastConnexionDate) / oneDay);
  if (diffDays === 1) {
    return props.streak + 1;
  } else if (diffDays === 0) {
    isToday.value = true;
    return props.streak; // Connexion le même jour
  } else {
    return 1; // Streak cassée
  }
}

const currentStreak = ref(props.streak);

async function handleComplete(goal) {
  console.log("complete");

  const newStreak = calculateStreak();
  currentStreak.value = newStreak;
  console.log("newStreak", newStreak);
  console.log("id", props._id);
  const goalUpdated = await $fetch(`/api/goal/complete`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newStreak,
      newConnexionDate: formattedTodayDate,
      id: props._id,
    }),
  });

  console.log("updated", goalUpdated);
}
</script>
