<template>
  <div class="flex flex-col justify-center items-center">
    <div>Hello from /app</div>
    <AddPost />
    <NuxtImg src="./uploads\\20210703_150421.jpg" alt="cc" />
    <div v-for="post in posts.data.value">
      <!-- <h1>{{ post }}</h1> -->
      <Post
        :subject="post.subject"
        :userId="post.userId"
        :content="post.content"
      />
    </div>
  </div>
</template>

<script setup>
const posts = await useFetch("/api/posts/list", {
  method: "GET",
});

// console.log(posts.data.value);
</script>
