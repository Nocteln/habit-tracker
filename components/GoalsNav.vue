<template>
  <div class="m-5 p-5 bg-[#023047] rounded-lg flex flex-col md:h-[85vh]">
    <UInput
      v-model="searchQuery"
      placeholder="Your habit"
      icon="i-heroicons-magnifying-glass"
    />
    <div class="grid grid-cols-2 gap-5 pt-5 md:flex md:flex-col">
      <UCheckbox
        v-for="(value, key) in searchParams"
        :key="key"
        v-model="searchParams[key]"
        :name="key"
        :label="getLabel(key)"
        @change="updateSelection(key)"
      />
    </div>
    <div class="hidden md:block">
      <UButton @click="$emit('addGoal')" class="mt-5" size="xl"
        >Add a Goal</UButton
      >
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["sort", "search", "addGoal"]);

const searchQuery = ref("");

const searchParams = reactive({
  aToz: false,
  zToa: false,
  date: false,
  streak: false,
  doneToday: false,
  nothing: true,
});

const updateSelection = (selectedKey) => {
  Object.keys(searchParams).forEach((key) => {
    searchParams[key] = key === selectedKey;
  });
  emit("sort", selectedKey);
};

watch(searchQuery, (newQuery) => {
  emit("search", newQuery);
});

const getLabel = (key) => {
  const labels = {
    aToz: "a -> z",
    zToa: "z -> a",
    date: "by date",
    streak: "by streak",
    doneToday: "done today",
    nothing: "clear",
  };
  return labels[key] || key;
};
</script>
