<template>
  <div
    class="m-5 p-5 bg-black rounded-lg items-center justify-between flex flex-col h-[85vh] fixed md:justify-start"
  >
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
  </div>
</template>

<script setup>
const emit = defineEmits(["sort", "search"]);

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
