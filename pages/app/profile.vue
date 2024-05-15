<template>
  <div class="flex items-center justify-center flex-col pt-3">
    <!-- <div
      class="flex items-center justify-center m-5 p-5 border-gray-500 border-4 rounded-full"
    >
      <img
        :src="userInfo.profilePicture"
        :alt="`${userInfo.name}'s profile picture`"
        class="rounded-full"
        width="150"
        height="150"
      />

      <div class="pl-5">
        <h1 class="text-lg font-bold">
          {{
            //@ts-expect-error
            $auth.user?.name ? $auth.user?.name : "user"
          }}
        </h1>
        <h2>{{ $auth.user?.email }}</h2>
        <UButton @click="openEditModal" class="my-2 px-5"
          >Edit <UIcon name="i-heroicons-pencil-square"
        /></UButton>
      </div>
    </div>
    <p>{{ $auth.user }}</p> -->
  </div>
</template>

<script setup lang="ts">
// import { EditUserInfoModal } from "#components";
// const { user } = useAuth();

// const modal = useModal();
// let userInfo;

// const isEditOpen = ref(false);
// try {
//   if (!user) {
//     navigateTo("/");
//   }
//   const { data } = await useFetch(`/api/users/${user?.id}`, {
//     method: "POST",
//     //@ts-ignore

//     body: {
//       user: user,
//     },
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   userInfo = data?.value?.user;
// } catch (e) {
//   console.error(e);
// }

// console.log(userInfo);

// definePageMeta({
//   middleware: ["auth-logged-in"],
// });
</script>

<style lang="scss" scoped></style>
