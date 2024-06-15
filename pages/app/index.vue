<template>
  <div class="flex flex-col justify-center items-center bg-[#8ECAE6]">
    <AddPost />
    <div v-for="post in posts">
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
        :class="arrowValue.previous ? 'text-white' : ''"
      />
      <p>{{ pagination.currentPage }}</p>
      <UIcon
        name="i-heroicons-chevron-right"
        @click="changePage('next')"
        :class="arrowValue.next ? 'text-white' : ''"
      />
    </div>

    <UNotifications />
  </div>
</template>

<script setup>
const posts = ref([]);
const pagination = ref([]);
const arrowValue = ref({
  previous: false,
  next: true,
});
const toast = useToast();

async function fetchData(page) {
  try {
    console.log("v", posts.value);
    const result = await useFetch(`/api/posts/list?limit=2&page=${page}`, {
      method: "GET",
    });
    posts.value = result.data.value.posts;
    pagination.value = result.data.value.pagination;
  } catch (e) {
    console.log("e", e);
    toast.add({
      id: "Cannot fetch",
      title: "Cannot fetch",
      description: "Error while fetching posts",
    });
  }
}

function changePage(direction) {
  const currentPage = pagination.value.currentPage;
  if (direction === "next") {
    if (currentPage >= pagination.value.totalPages) {
      arrowValue.value.previous = true;
      arrowValue.value.next = false;
      return;
    }
    fetchData(currentPage + 1);
  } else {
    if (currentPage <= 1) {
      arrowValue.value.previous = false;
      arrowValue.value.next = true;
      return;
    }
    fetchData(currentPage - 1);
  }
}

fetchData(1);
</script>
