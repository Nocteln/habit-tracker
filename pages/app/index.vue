<template>
  <h1>hey {{ data?.user?.name }}</h1>
</template>

<script setup lang="ts">
const { data } = useAuth();
// let userInfo;

// async function loadUserProfile() {
//   const client = useKindeClient();
//   const user = await client.getUserProfile();

//   return user;
// }

// try {
//   const user = await loadUserProfile();

//   const { data } = await useFetch(`/api/users/${user.id}`, {
//     method: "POST",
//     //@ts-ignore

//     body: {
//       user: user,
//     },
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   userInfo = data.value.user;
// } catch (e) {
//   console.error(e);
// }
// // console.log(data);
// // console.log(userInfo);
// definePageMeta({
//   middleware: ["auth-logged-in"],
// });
</script>

<style lang="scss" scoped></style>
