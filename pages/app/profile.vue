<template>
  <div>
    <img
      :src="
        $auth.user?.picture
          ? $auth.user.picture
          : 'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png'
      "
      alt="profile picture"
    />
    <h1>{{ $auth.user?.name ? $auth.user.name : "user" }}</h1>
    <h2>{{ $auth.user?.email }}</h2>
    <p>{{ $auth.user }}</p>
  </div>
</template>
<script setup lang="ts">
// import mongoose from 'mongoose';

definePageMeta({
  middleware: ["auth-logged-in"],
});

// const getData= async ({
//   email, id, firstName, lastName, profileImage
// }: {
//   email: string;
//   id: string;
//   firstName: string | undefined | null;
//   lastName: string | undefined | null;
//   profileImage: string | undefined | null;
// }) => {
//   const user = await mongoose.findOne()
// }
</script>

<style lang="scss" scoped></style>
