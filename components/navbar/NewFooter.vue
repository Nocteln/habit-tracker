<template>
  <div
    class="bg-[#1D2130] text-white w-full rounded-t-[15px] flex justify-evenly items-center pt-[75px] px-[125px] pb-[97px]"
  >
    <div>
      <img src="/logo_base.png" alt="logo" class="w-[100px] h-[100px]" />
      <h2>
        MyDailyTracking est une webapp vous permettant de tracker efficacement
        vos habitudes.
      </h2>
      <h3>MyDailyTracking © 2024 Tous droits réservés.</h3>
    </div>
    <div>
      <h1>Liens utiles</h1>
      <div class="flex flex-col">
        <NuxtLink to="/login">Connexion</NuxtLink>
        <NuxtLink to="/app/profile">Mon profile</NuxtLink>
        <NuxtLink to="/app/habits">Mes habitudes</NuxtLink>
        <NuxtLink to="/leaderboard">leaderboard</NuxtLink>
      </div>
    </div>
    <div>
      <h1>Mentions légales</h1>
      <NuxtLink to="/legal-mentions">Conditions d'utilisation</NuxtLink>
      <NuxtLink to="/policy ">Politique de confidentialité</NuxtLink>
    </div>
  </div>
</template>
