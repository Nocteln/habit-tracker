<script setup>
const { signOut } = useAuth();
const emit = defineEmits(["added", "adding"]);
const { userId } = defineProps(["userId"]);

const loading = ref(false);
const phrase = ref("");
const isPhraseNotComplete = ref(true);

watch(phrase, (newValue, oldValue) => {
  console.log("change");
  if (newValue === "I want to delete my account") {
    console.log("cc");
    isPhraseNotComplete.value = false;
  } else {
    isPhraseNotComplete.value = true;
  }
});

async function reset() {
  loading.value = true;
  emit("adding");
  await $fetch("/api/user/resetData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, deleteAll: true }),
  });
  await signOut({ callbackUrl: "/", redirect: true });
  loading.value = false;
  emit("added");
}
</script>

<template>
  <UCard>
    <div v-if="!loading" class="flex flex-col md:flex-row justify-evenly">
      <div class="space-y-2 items-center text-center">
        <h1 class="text-2xl font-bold">
          Are you sure you want to <span class="text-red-500">delete</span> your
          account ?
        </h1>
        <h2 class="text-lg pb-5">
          Type
          <span class="border-2 border-slate-500 p-1 rounded-lg bg-slate-800"
            >I want to delete my account</span
          >
          to delete your account and all it's data!
        </h2>
        <div class="space-y-4 text-center">
          <UFormGroup label="" name="phrase">
            <UInput
              color="red"
              v-model="phrase"
              placeholder="I want to delete my data"
            />
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
      DELETE
    </UButton>
    <div v-if="loading" class="flex items-center text-center justify-center">
      <Icon name="i-heroicons-arrow-path" size="50" class="animate-spin" />
    </div>
  </UCard>
</template>
