<template>
  <div class="flex items-center justify-center flex-col pt-3">
    <div
      class="flex items-center justify-center m-5 p-5 border-gray-500 border-4 rounded-full"
    >
      <img
        :src="userSearched.data.value.image"
        :alt="`${userSearched.data.value.username}'s profile picture`"
        class="rounded-full"
        width="150"
        height="150"
      />

      <div class="pl-5">
        <h1 class="text-lg font-bold">
          {{
            userSearched.data.value.name ? userSearched.data.value.name : "user"
          }}
        </h1>
      </div>
      <!-- <UButton @click="followUser" v-if="searchedUserId !== userId">{{
        isFollowing ? "Unfollow" : "Follow"
      }}</UButton> -->
    </div>
    <Level :userId="searchedUserId" />
    <h1 class="pt-10 text-2xl font-bold" v-if="isAProfileDisplay">
      {{ userSearched.data.value.name }}'s favorite habits :
    </h1>
    <div>
      <div v-for="goal in goals.data.value" :key="goal._id">
        <Goal
          :goal="goal"
          :isAProfileDisplay="true"
          v-if="goal.displayedOnProfile"
        />
      </div>
    </div>
    <!-- {{ data }} -->
  </div>
</template>
<script setup>
const route = useRoute();
const searchedUserId = route.params.userId;

const { data } = useAuth();
const userId = data.value.user.id;

const isFollowingBack = await useFetch(
  `/api/user/isFollowing?userId=${userId}&userToFollowId=${searchedUserId}`,
  {
    method: "GET",
  }
);

const userSearched = await useFetch(`/api/user/${searchedUserId}`, {
  method: "GET",
});

const goals = await useFetch(`/api/goal/list?userId=${searchedUserId}`, {
  method: "GET",
});

const isAProfileDisplay = ref(false);

for (const goal of goals.data.value) {
  if (goal.displayedOnProfile) {
    isAProfileDisplay.value = true;
  }
}

const isFollowing = ref(isFollowingBack.data.value === searchedUserId);
async function followUser() {
  await fetch(`/api/user/follow/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      userToFollowId: searchedUserId,
      isFollowing: isFollowing.value,
    }),
  });
  isFollowing.value = !isFollowing.value;
  // userSearched.data.value.isFollowing = true;
}
</script>
