<script setup>
const { data, status, signOut } = useAuth();

let isLogged;
const loading = ref(false);
const selected = ref();

async function searchUsers(query) {
  loading.value = true;
  const { users } = await $fetch(`/api/user/list?${query}`, {
    method: "GET",
  });
  loading.value = false;

  return users;
}

watch(selected, (newValue) => {
  if (newValue) {
    navigateTo(`/app/user/${newValue.id}`);
  }
});

if (status.value === "authenticated") {
  isLogged = true;
} else {
  isLogged = false;
}

const items = [
  [
    {
      label: data.value?.user?.email,
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Profile",
      icon: "i-heroicons-user-circle",
      click: () => {
        navigateTo("/app/profile", {
          external: true,
        });
      },
    },
  ],
  [
    {
      label: "My Habits",
      icon: "i-heroicons-book-open",
      click: () => {
        navigateTo("/app/habits", {
          external: true,
        });
      },
    },
    {
      label: "My Friends",
      icon: "i-heroicons-megaphone",
      click: () => {
        navigateTo("/app", {
          external: true,
        });
      },
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: async () => {
        await signOut();
        navigateTo("/", {
          external: true,
        });
      },
    },
  ],
];
</script>

<template>
  <div class="flex justify-around shadow-sm p-5 bg-[#219EBC] items-center">
    <h1 class="font-bold text-3xl">
      <NuxtLink :to="isLogged ? '/app' : '/'">Habit Tracker</NuxtLink>
    </h1>
    <UInputMenu
      trailing-icon="i-heroicons-chevron-up-down-20-solid"
      class="w-full lg:w-[40vh]"
      placeholder="Search peoples"
      icon="i-heroicons-magnifying-glass-20-solid"
      v-model="selected"
      :search="searchUsers"
      :loading="loading"
      option-attribute="username"
      trailing
    />
    <div v-if="isLogged">
      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
        class="flex items-center justify-center gap-5"
      >
        <UButton
          color="white"
          :label="
            data?.user?.username ? data?.user?.username : 'cannot find name'
          "
          trailing-icon="i-heroicons-chevron-down-20-solid"
        >
          <template #leading
            ><UAvatar :src="`${data?.user?.image}`" />
          </template>
        </UButton>

        <template #account="{ item }">
          <div class="text-left">
            <p>Signed in as</p>
            <p class="truncate font-medium text-gray-900 dark:text-white">
              {{ item.label }}
            </p>
          </div>
        </template>

        <template #item="{ item }">
          <span class="truncate">{{ item.label }}</span>

          <UIcon
            :name="item.icon"
            class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
          />
        </template>
      </UDropdown>
    </div>

    <div v-else class="gap-5 flex items-center justify-center">
      <UButton>
        <NuxtLink to="/login">Create an account</NuxtLink>
      </UButton>
      <UButton variant="outline">
        <NuxtLink to="/login">Log In</NuxtLink>
      </UButton>
    </div>
  </div>
</template>
