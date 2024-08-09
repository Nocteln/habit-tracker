<template>
  <div
    class="bg-[#8ECAE6] h-full text-center justify-center flex flex-col items-center text-pacific-blue-900"
  >
    <Hero />

    <section>
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
    </section>

    <section class="my-12">
      <h1 class="text-3xl font-bold mb-5">Our fonctionalities</h1>
      <ShowFonctionalite
        image="/habit_page.png"
        name="Gestion des habitudes"
        description="La fonctionnalitée principale qui vous permettra d'ajouter, de modifier, de trier vos habitudes"
      />
      <ShowFonctionalite
        image="/public_profile_page.png"
        name="Profile public/privé"
        description="Partagez votre progrès à travers votre profile!"
        :reversed="true"
      />
      <ShowFonctionalite
        image="/chat_page.png"
        name="Forum de discussion"
        description="Partagez vos pensées, vos progrès, et plein d'autres choses à travers le chat intégré!"
      />
      <ShowFonctionalite
        image="/leaderboard_page.png"
        name="Leaderboard"
        description="Gagnez de l'xp en complettant vos objectifs et vos challenges pour grimper au leaderboard!"
        :reversed="true"
      />
    </section>

    <section class="m-24">
      <h1 class="text-3xl font-bold mb-5">So? What are you waiting for?</h1>
      <UButton
        size="xl"
        class="w-[40vw] h-[7vh] justify-center font-bold text-xl"
        ><NuxtLink to="login" v-if="status !== 'authenticated'"
          >Join US !</NuxtLink
        >
        <NuxtLink to="app" v-else>Go to the app!</NuxtLink>
      </UButton>
    </section>
  </div>
</template>

<script setup>
const { status } = useAuth();
</script>
