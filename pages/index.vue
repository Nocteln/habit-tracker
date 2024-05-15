<template>
  <div class="bg-[#8ECAE6] h-full">
    <Hero />
    <div
      id="g_id_onload"
      data-client_id="YOUR_GOOGLE_CLIENT_ID

"
      data-login_uri="https://your.domain/your_login_endpoint

"
      data-auto_select="true"
    ></div>

    <NuxtLink to="/api/login" external> Sign in </NuxtLink>
    <NuxtLink to="/api/logout" external> Sign out </NuxtLink>
    <!-- <p v-if="$auth.loggedIn">I'm signed in!</p> -->
    <!-- <p v-else>I'm signed out :(</p> -->

    <form action="">
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Submit</button>
    </form>

    <!-- <p>{{ $auth.user }}</p> -->

    <!-- <button @click="execute">Execute</button> -->
  </div>
</template>

<!-- <script setup lang="ts">
import { prisma } from "../prisma/db";

async function main() {
  await prisma.post.update({
    where: {
      slug: "my-first-post",
    },
    data: {
      comments: {
        createMany: {
          data: [
            { comment: "Great post!" },
            { comment: "Can't wait to read more!" },
          ],
        },
      },
    },
  });
  const posts = await prisma.post.findMany({
    include: {
      comments: true,
    },
  });

  console.dir(posts, { depth: Infinity });
}

console.log("execute");
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
</script> -->

<style scoped></style>
