<template>
  <div
    class="flex items-center justify-around text-[#1D2130] bg-white top-0 sticky p-3"
  >
    <NuxtLink to="/">
      <img src="/logo_base.png" width="58" class="cursor-pointer" />
    </NuxtLink>
    <ul class="flex justify-between items-center gap-5">
      <li class="cursor-pointer p-2 hover:bg-slate-300 rounded-md transition">
        How it works
      </li>
      <li class="cursor-pointer p-2 hover:bg-slate-300 rounded-md transition">
        Features
      </li>
      <li class="cursor-pointer p-2 hover:bg-slate-300 rounded-md transition">
        Pricing
      </li>
    </ul>
    <UButton color="gray" size="lg" class="px-12">Login</UButton>
  </div>
</template>
