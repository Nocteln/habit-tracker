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

      <!-- Menu pour desktop -->
      <ul class="hidden md:flex items-center gap-5 text-[#1D2130]">
        <li>
          <a
            href="#how-it-works"
            class="cursor-pointer p-2 hover:bg-slate-200 rounded-md transition"
          >
            How it works
          </a>
        </li>
        <li>
          <a
            href="#features"
            class="cursor-pointer p-2 hover:bg-slate-200 rounded-md transition"
          >
            Features
          </a>
        </li>
        <li>
          <a
            href="#pricing"
            class="cursor-pointer p-2 hover:bg-slate-200 rounded-md transition"
          >
            Pricing
          </a>
        </li>
      </ul>

      <NuxtLink
        to="/login"
        class="hidden md:block bg-[#1D2130] hover:bg-[#1D2130cc] px-4 py-2 text-white rounded-[12px] transition"
      >
        Login
      </NuxtLink>

      <!-- Burger menu pour mobile -->
      <div class="md:hidden">
        <button @click="toggleMenu" class="text-[#1D2130] z-50 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              v-if="!isMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Menu mobile avec animation de déroulement -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[400px] opacity-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="max-h-[400px] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div
        v-if="isMenuOpen"
        class="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg overflow-hidden"
      >
        <ul class="flex flex-col items-center gap-4 py-4 text-[#1D2130]">
          <li
            class="cursor-pointer p-2 hover:bg-slate-200 rounded-md transition w-full text-center"
          >
            How it works
          </li>
          <li
            class="cursor-pointer p-2 hover:bg-slate-200 rounded-md transition w-full text-center"
          >
            Features
          </li>
          <li
            class="cursor-pointer p-2 hover:bg-slate-200 rounded-md transition w-full text-center"
          >
            Pricing
          </li>
          <li class="w-full px-4">
            <button
              class="bg-[#1D2130] hover:bg-[#1D2130cc] px-4 py-2 text-white rounded-[12px] transition w-full"
            >
              Login
            </button>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const isMenuOpen = ref(false);
const isNavbarVisible = ref(true);
let lastScrollTop = 0;

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const handleScroll = () => {
  const currentScrollTop =
    window.pageYOffset || document.documentElement.scrollTop;
  if (currentScrollTop > lastScrollTop) {
    // Scrolling down
    isNavbarVisible.value = false;
  } else {
    // Scrolling up
    isNavbarVisible.value = true;
  }
  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.transition-all {
  transition-property: all;
}

.hide-navbar {
  transform: translateY(-100%);
  transition: transform 0.3s ease-in-out;
}

.show-navbar {
  transform: translateY(0);
  transition: transform 0.3s ease-in-out;
}
</style>
