<template>
  <div
    class="m-5 p-5 bg-black w-[80vw] sm:w-full rounded-lg sm:rounded-none items-center justify-between flex flex-col sm:flex-row"
  >
    <UInput placeholder="Your habit" icon="i-heroicons-magnifying-glass" />
    <div class="grid grid-cols-2 gap-5 pt-5">
      <UCheckbox
        v-model="searchParams.aToz"
        name="alphabetize"
        label="a -> z"
      />
      <UCheckbox
        v-model="searchParams.zToa"
        name="alphabetize"
        label="z -> a"
      />
      <UCheckbox v-model="searchParams.date" name="date" label="by date" />
      <UCheckbox
        v-model="searchParams.streak"
        name="streak"
        label="by streak"
      />
      <UCheckbox
        v-model="searchParams.doneToday"
        name="doneToday"
        label="done today"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const searchParams = ref({
  aToz: false,
  zToa: false,
  date: false,
  streak: false,
  doneToday: false,
});

// searchParams.value.aToz = true;

const updateCheckboxes = (checkedParam) => {
  for (const key in searchParams.value) {
    if (key === checkedParam) {
      searchParams.value[key] = true;
    } else {
      searchParams.value[key] = false;
    }
  }
};

watch(
  () => searchParams.value,
  (newVal) => {
    console.log("searchParams updated:", newVal);

    if (newVal.aToz) updateCheckboxes("aToz");
    else if (newVal.zToa) updateCheckboxes("zToa");
    else if (newVal.date) updateCheckboxes("date");
    else if (newVal.streak) updateCheckboxes("streak");
    else if (newVal.doneToday) updateCheckboxes("doneToday");

    sortItems();
  },
  { deep: true }
);

const sortItems = () => {
  if (searchParams.value.aToz) {
    console.log("Tri par ordre alphabétique A à Z");
  } else if (searchParams.value.zToa) {
    console.log("Tri par ordre alphabétique Z à A");
  } else if (searchParams.value.date) {
    console.log("Tri par date");
  } else if (searchParams.value.streak) {
    console.log("Tri par streak");
  } else if (searchParams.value.doneToday) {
    console.log("Tri par fait aujourd'hui");
  } else {
    console.log("Aucun tri appliqué");
  }
};
</script>
