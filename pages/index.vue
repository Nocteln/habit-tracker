<template>
  <div
    class="bg-[#8ECAE6] h-full text-center justify-center flex flex-col items-center text-pacific-blue-900"
  >
    <Hero />

    <h1 class="text-3xl font-bold">How it work ?</h1>
    <ol
      class="m-5 text-xl md:flex justify-center items-center text-center font-bold bg-pacific-blue-500 rounded-md p-5 w-[80vw] lg:w-[60vw]"
    >
      <li class="text-gold-drop-950">Create an account</li>
      <UIcon
        name="i-heroicons-arrow-right-circle"
        class="text-3xl m-5 md:my-0.5 items-center text-gold-drop-900 rotate-90 md:rotate-0"
      />
      <li class="text-gold-drop-800">Add habits to your list</li>
      <UIcon
        name="i-heroicons-arrow-right-circle"
        class="text-3xl m-5 md:my-0.5 items-center text-gold-drop-700 rotate-90 md:rotate-0"
      />
      <li class="text-gold-drop-600">Start tracking your progress!</li>
    </ol>
  </div>
</template>

<script setup></script>
