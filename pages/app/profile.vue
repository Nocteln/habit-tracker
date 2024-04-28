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
</script>

<style lang="scss" scoped></style>
