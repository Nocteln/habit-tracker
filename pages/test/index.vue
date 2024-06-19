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
    <UPagination
      v-model="page"
      :page-count="2"
      :max="2"
      :total="posts.length"
    />

    <UNotifications />
  </div>
</template>

<script setup>
const posts = ref([]);
const pagination = ref([]);
const page = ref(1);
const items = ref([]);
const toast = useToast();

async function fetchData(page) {
  try {
    const result = await useFetch(`/api/posts/listtest`, {
      method: "GET",
    });
    // console.log(result.data.value);
    posts.value = result.data.value;
    // posts.value = result.data.value.posts;
    // pagination.value = result.data.value.pagination;
    // console.log(pagination.value);
  } catch (e) {
    toast.add({
      id: "Cannot fetch",
      title: "Cannot fetch",
      description: "Error while fetching posts",
    });
  }
}

// function changePage(direction) {
//   const currentPage = pagination.value.currentPage;
//   if (direction === "next") {
//     if (currentPage >= pagination.value.totalPages) return;
//     fetchData(currentPage + 1);
//   } else {
//     if (currentPage <= 1) return;
//     fetchData(currentPage - 1);
//   }
// }

fetchData(1);
</script>
