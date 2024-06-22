<template>
  <div
    v-for="goal in goals"
    :key="goal.name"
    class="flex flex-col justify-center items-center"
  >
    <Goal :goal="goal" />
  </div>
</template>

<script setup>
const goals = [
  {
    name: "appeler mamie",
    description: "Rappeler mamie à 10h",
    icon: "i-heroicons-phone",
    streak: 3,
    completed: false,
    color: "text-blue-400",
  },
  {
    name: "faire du sport",
    description: "Courir 5 km",
    icon: "i-heroicons-paper-airplane",
    streak: 7,
    completed: true,
    color: "text-green-400",
  },
  {
    name: "apprendre React",
    description: "Suivre un cours sur React pendant 1h",
    icon: "i-heroicons-academic-cap",
    streak: 5,
    completed: false,
    color: "text-purple-400",
  },
  {
    name: "pratiquer le piano",
    description: "Jouer du piano pendant 30 minutes",
    icon: "i-heroicons-musical-note",
    streak: 2,
    completed: false,
    color: "text-red-400",
  },
  {
    name: "étudier les maths",
    description: "Réviser les chapitres sur les dérivées",
    icon: "i-heroicons-book-open",
    streak: 4,
    completed: true,
    color: "text-orange-400",
  },
];
</script>
