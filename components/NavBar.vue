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
      label: "My Profile",
      icon: "i-heroicons-user-circle",
      click: () => {
        navigateTo("/app/profile", {
          external: true,
        });
      },
    },
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
      icon: "i-heroicons-users",
      click: () => {
        navigateTo("/app/friends", {
          external: true,
        });
      },
    },
    {
      label: "My Settings",
      icon: "i-heroicons-cog-6-tooth",
      click: () => {
        navigateTo("/app/settings", {
          external: true,
        });
      },
    },
  ],
  [
    {
      label: "Leaderboard",
      icon: "i-heroicons-trophy",
      click: () => {
        navigateTo("/app/leaderboard", {
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
        await signOut({ callbackUrl: "/", redirect: true });
      },
    },
  ],
];
</script>

<template>
  <div
    class="flex flex-col md:flex-row items-center justify-between p-5 bg-[#219EBC]"
  >
    <div class="flex items-center justify-between mb-4 w-full">
      <h1 class="text-3xl mr-4">
        <NuxtLink :to="isLogged ? '/app' : '/'"
          ><span class="font-bold">My</span>
          <span class="underline"> Daily Tracking</span></NuxtLink
        >
      </h1>
      <UInputMenu
        trailing-icon="i-heroicons-chevron-up-down-20-solid"
        class="hidden md:block mr-4"
        size="lg"
        placeholder="Search peoples"
        icon="i-heroicons-magnifying-glass-20-solid"
        v-model="selected"
        :search="searchUsers"
        :loading="loading"
        option-attribute="username"
        trailing
        v-if="isLogged"
      />
      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
        class="flex items-center justify-center gap-5"
        v-if="isLogged"
      >
        <UButton
          color="white"
          :label="
            data?.user?.username ? data?.user?.username : 'cannot find name'
          "
          trailing-icon="i-heroicons-chevron-down-20-solid"
          class="hidden sm:flex items-center"
        >
          <template #leading
            ><UAvatar :src="`${data?.user?.image}`" />
          </template>
        </UButton>
        <UButton
          color="white"
          trailing-icon="i-heroicons-chevron-down-20-solid"
          class="flex sm:hidden"
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

      <div v-else class="gap-5 flex items-center justify-center flex-wrap">
        <UButton>
          <NuxtLink to="/login">Create an account</NuxtLink>
        </UButton>
        <UButton variant="outline">
          <NuxtLink to="/login">Log In</NuxtLink>
        </UButton>
      </div>
    </div>
    <UInputMenu
      trailing-icon="i-heroicons-chevron-up-down-20-solid"
      class="md:hidden w-full mt-4"
      size="lg"
      placeholder="Search peoples"
      icon="i-heroicons-magnifying-glass-20-solid"
      v-model="selected"
      :search="searchUsers"
      :loading="loading"
      option-attribute="username"
      trailing
      v-if="isLogged"
    />
  </div>
</template>
