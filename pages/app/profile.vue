<template>
  <div>
    <!--<img
      :src="
        $auth.user?.picture
          ? $auth.user.picture
          : 'https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png'
      "
      alt="profile picture"
    />-->
    <img :src="userInfo.profilePicture" />

    <h1>
      {{
        //@ts-expect-error
        $auth.user?.name ? $auth.user?.name : "user"
      }}
    </h1>
    <h2>{{ $auth.user?.email }}</h2>
    <p>{{ $auth.user }}</p>
    <button @click="main">add user</button>
  </div>
</template>
<script setup lang="ts">
import { useKindeClient } from "#imports";

let userInfo;

async function loadUserProfile() {
  const client = useKindeClient();
  const user = await client.getUserProfile();

  return user;
}

try {
  const user = await loadUserProfile();
  // const { data } = await useFetch(`/api/users/${user.id}`);
  const { data } = await useFetch(`/api/users/${user.id}`, {
    method: "POST",
    //@ts-ignore
    body: {
      user: user,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  userInfo = data.value;
} catch (e) {
  console.error(e);
}

definePageMeta({
  middleware: ["auth-logged-in"],
});

// const main = async () => {
//   const body = {
//     name: "bibi",
//     email: "bibi@gmail.com",
//     kindeId: 36523653,
//     profilePicture:
//       "https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png",
//     pseudo: "bibipseud",
//   };

//   await fetch("/api/users", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(body),
//   })
//     .then(() => {
//       console.log("user created");
//     })
//     .catch((err) => console.error("Failed to create user", err));
// };
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
