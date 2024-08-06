<template>
  <div class="flex flex-col justify-center items-center bg-[#8ECAE6]">
    <AddPost />
    <div v-for="post in posts" :key="post._id">
      <Post
        :subject="post.subject"
        :userId="post.userId"
        :content="post.content"
        :images="post.images"
        :createdAt="post.createdAt"
      />
    </div>
    <div class="flex items-center text-black justify-center text-3xl p-5">
      <UIcon
        name="i-heroicons-chevron-left"
        @click="changePage('previous')"
        :class="pagination.currentPage <= 1 ? 'text-slate-600' : ''"
      />
      <p>{{ pagination.currentPage }}</p>
      <UIcon
        name="i-heroicons-chevron-right"
        @click="changePage('next')"
        :class="
          pagination.currentPage >= pagination.totalPages
            ? 'text-slate-600'
            : ''
        "
      />
    </div>
    <UNotifications />
  </div>
</template>

<script setup>
import { useUserStore } from "~/store/user";

const posts = ref([]);
const pagination = ref([]);
const toast = useToast();

const user = useUserStore();

await callOnce(user.fetch);

async function fetchData(page) {
  try {
    const result = await useFetch(`/api/posts/list?limit=10&page=${page}`, {
      method: "GET",
    });
    posts.value = result.data.value.posts;
    pagination.value = result.data.value.pagination;
    console.log(pagination.value);
  } catch (e) {
    console.error(e);
    toast.add({
      id: "Cannot fetch",
      title: "Cannot fetch",
      description: "Error while fetching posts",
    });
  }
}

fetchData(1);

function changePage(direction) {
  const currentPage = pagination.value.currentPage;
  if (direction === "next") {
    if (currentPage >= pagination.value.totalPages) return;
    fetchData(currentPage + 1);
  } else {
    if (currentPage <= 1) return;
    fetchData(currentPage - 1);
  }
}
</script>
