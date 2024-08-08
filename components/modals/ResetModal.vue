<script setup>
const emit = defineEmits(["added", "adding"]);
const { userId } = defineProps(["userId"]);

const loading = ref(false);
const phrase = ref("");
const isPhraseNotComplete = ref(true);
const easterEgg = ref(false);

watch(phrase, (newValue, oldValue) => {
  console.log("change");
  if (newValue === "I want to reset my data") {
    isPhraseNotComplete.value = false;
  } else if (newValue === "Un donut sucré au sucre") {
    easterEgg.value = true;
    isPhraseNotComplete.value = false;
  } else {
    isPhraseNotComplete.value = true;
  }
});

async function reset() {
  if (easterEgg.value) {
    navigateTo("https://www.youtube.com/watch?v=dQw4w9WgXcQ", {
      external: true,
    });
    return;
  }
  loading.value = true;
  emit("adding");
  await $fetch("/api/user/resetData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId }),
  });

  loading.value = false;
  emit("added");
}
</script>

<template>
  <UCard>
    <div v-if="!loading" class="flex flex-col md:flex-row justify-evenly">
      <div class="space-y-2 items-center text-center">
        <h1 class="text-2xl font-bold">
          Are you sure you want to <span class="text-red-500">reset</span> your
          data ?
        </h1>
        <h2 class="text-lg pb-5">
          Type
          <span class="border-2 border-slate-500 p-1 rounded-lg bg-slate-800"
            >I want to reset my data</span
          >
          to reset your data
        </h2>
        <div class="space-y-4 text-center">
          <UFormGroup label="" name="phrase">
            <UInput v-model="phrase" placeholder="I want to reset my data" />
          </UFormGroup>
        </div>
      </div>
    </div>
    <UButton
      @click="reset"
      color="red"
      class="mt-5"
      block
      size="lg"
      :disabled="isPhraseNotComplete"
    >
      RESET
    </UButton>
    <div v-if="loading" class="flex items-center text-center justify-center">
      <Icon name="i-heroicons-arrow-path" size="50" class="animate-spin" />
    </div>
  </UCard>
</template>
