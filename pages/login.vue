<script setup>
import NewFooter from "~/components/navbar/NewFooter.vue";
import NewNavBar from "~/components/navbar/NewNavBar.vue";
const { signIn, data } = useAuth();

function handleGoogle() {
  signIn("google");
}

function handleDiscord() {
  signIn("discord");
}
// import NewNavBar from "~/components/new/NewNavBar.vue";
definePageMeta({
  layout: "nothing",
  middleware: "login",
});
</script>

<template>
  <div class="bg-white text-[#1D2130]">
    <NewNavBar />
    <div class="text-center flex flex-col items-center pb-32">
      <h1
        class="p-12 text-[24px] bg-gradient-to-r from-[#373FFF] to-[#3ACAF8] inline-block text-transparent bg-clip-text font-bold"
      >
        REGISTER / LOGIN
      </h1>
      <p class="text-[30px] font-bold">Join a community that suits you!</p>
      <div class="flex flex-col md:flex-row gap-12 mt-12">
        <button
          @click="handleGoogle"
          class="flex px-16 md:my-12 py-3 rounded-[12px] transition items-center text-xl border-2 hover:shadow-md duration-300 hover:scale-105"
        >
          <UIcon name="i-logos-google-icon" class="mr-2" />
          <p>Connect with google</p>
        </button>
        <button
          @click="handleDiscord"
          class="bg-[#4e6ee2] text-white flex px-16 md:my-12 py-3 rounded-[12px] transition items-center text-xl shadow-xl border-2 border-[#748adb] hover:shadow-lg duration-300 hover:scale-105"
        >
          <UIcon name="i-bxl-discord-alt" class="mr-2 w-8 h-8 text-white" />
          <p>Connect with discord</p>
        </button>
      </div>
      <h1
        class="p-12 text-[24px] bg-gradient-to-r from-[#373FFF] to-[#3ACAF8] inline-block text-transparent bg-clip-text font-bold"
      >
        AVANTAGES
      </h1>
      <p class="text-[30px] font-bold">The avantages you get by register</p>
      <div class="md:flex mt-12">
        <InfoCard
          color="yellow-500"
          text="Create new habits"
          icon="i-heroicons-plus-circle"
        />
        <InfoCard
          color="red-500"
          text="Share your progress"
          icon="i-heroicons-share"
        />
        <InfoCard
          color="purple-500"
          text="Complete challenges"
          icon="i-heroicons-trophy"
        />
      </div>
    </div>

    <NewFooter />
  </div>
</template>
