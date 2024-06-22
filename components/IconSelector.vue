<template>
  <UCard class="max-w-[25vw]">
    <!-- <template #header> Search Icons </template> -->
    <div
      class="flex flex-wrap items-center justify-center max-h-32 overflow-auto"
    >
      <div
        v-for="icon in icons"
        :key="icon"
        class="border-2 rounded-xl p-2 m-1"
        :class="
          icon === selectedIcon ? 'border-orange-600' : 'border-slate-500'
        "
        @click="changeIcon(icon)"
      >
        <Icon
          :name="`i-heroicons-${icon}`"
          size="24"
          :class="`text-${color}`"
        />
      </div>
    </div>
    <template #footer>
      <!-- <UInput type="color" @change="changeColor" /> -->
      <div class="flex items-center justify-around">
        <div v-for="color in colors" :key="color">
          <div :class="`w-8 h-8 bg-${color} rounded-xl`" />
        </div>
      </div>
    </template>
  </UCard>
</template>

<script setup>
const emit = defineEmits(["changeIcon"]);

const color = ref("text-white");

const colors = [
  "red-400",
  "green-400",
  "blue-400",
  "purple-400",
  "pink-400",
  "yellow-400",
];

const icons = [
  "academic-cap",
  "archive-box",
  "arrow-left-end-on-rectangle",
  "arrow-right-start-on-rectangle",
  "arrow-path",
  "arrow-up-on-square-stack",
  "at-symbol",
  "banknotes",
  "beaker",
  "bell-alert",
  "bell-snooze",
  "bolt",
  "book-open",
  "briefcase",
  "bug-ant",
  "cake",
  "calculator",
  "calendar-days",
  "camera",
  "chat-bubble-left-right",
  "cloud",
  "code-bracket",
  "gift",
  "musical-note",
  "phone",
  "pencil",
  "wrench-screwdriver",
];

const selectedIcon = ref(null);

function changeIcon(icon) {
  selectedIcon.value = icon;
  emit("changeIcon", icon);
}

function changeColor(event) {
  color.value = event;
  console.log(event);
}
</script>
