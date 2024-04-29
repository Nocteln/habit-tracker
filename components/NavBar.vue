<script setup lang="ts">
const items = [
  [
    {
      label: "ben@example.com",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Profile",
      icon: "i-heroicons-user-circle",
    },
  ],
  [
    {
      label: "My Habits",
      icon: "i-heroicons-book-open",
    },
    {
      label: "My Friends",
      icon: "i-heroicons-megaphone",
    },
    {
      label: "Status",
      icon: "i-heroicons-signal",
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
      click: () => {
        navigateTo("/api/logout", {
          external: true,
        });
      },
    },
  ],
];

const foo = useUser();
</script>

<template>
  <div class="flex justify-around shadow-sm p-5 bg-[#219EBC]">
    <h1 class="font-bold text-3xl">
      <NuxtLink to="/">Habit Tracker</NuxtLink>
    </h1>
    <ul>
      <li><NuxtLink>Lien</NuxtLink></li>
    </ul>
    <h1>{{ foo }}</h1>
    <div v-if="$auth.loggedIn">
      <UDropdown
        :items="items"
        :ui="{ item: { disabled: 'cursor-text select-text' } }"
        :popper="{ placement: 'bottom-start' }"
        class="flex items-center justify-center gap-5"
      >
        <UButton
          color="white"
          :label="$auth.user?.name"
          trailing-icon="i-heroicons-chevron-down-20-solid"
        >
          <template #leading
            ><UAvatar
              src="https://avatars.githubusercontent.com/u/739984?v=4"
            />
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
        <NuxtLink to="/api/register" external>Create an account</NuxtLink>
      </UButton>
      <UButton variant="outline">
        <NuxtLink to="/api/login" external>Log In</NuxtLink>
      </UButton>
    </div>
  </div>
</template>
