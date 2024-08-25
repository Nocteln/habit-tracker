<template>
  <div
    :class="[
      'bg-white top-0 sticky z-50 shadow-xl',
      { 'hide-navbar': !isNavbarVisible, 'show-navbar': isNavbarVisible },
    ]"
  >
    <div class="container mx-auto flex items-center justify-between p-3">
      <NuxtLink to="/">
        <img src="/logo_base.png" width="58" class="cursor-pointer" />
      </NuxtLink>

      <UInputMenu
        trailing-icon="i-heroicons-chevron-up-down-20-solid"
        class="md:w-[30vw]"
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
    </div>
  </div>
</template>

<script setup>
const { data, status, signOut } = useAuth();

let isLogged;
const loading = ref(false);
const isNavbarVisible = ref(true);
let lastScrollTop = 0;
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

const handleScroll = () => {
  const currentScrollTop =
    window.pageYOffset || document.documentElement.scrollTop;
  isNavbarVisible.value = currentScrollTop <= lastScrollTop;
  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
