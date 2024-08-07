<template>
  <div class="flex items-center justify-center flex-col pt-3">
    <div
      class="flex items-center justify-center m-5 p-5 border-gray-500 rounded-md"
    >
      <img
        :src="userSearched.image"
        :alt="`${userSearched.username}'s profile picture`"
        class="rounded-full"
        width="150"
        height="150"
      />

      <div class="flex flex-col items-center text-center justify-center mx-3">
        <div class="pl-5">
          <h1 class="text-2xl font-bold">
            {{ userSearched.name ? userSearched.name : "user" }}
          </h1>
        </div>

        <h3 class="text-md">Member since {{ fullDate }}</h3>
        <!-- <UButton @click="followUser" v-if="searchedUserId !== userId">{{
          isFollowing ? "Unfollow" : "Follow"
        }}</UButton> -->
      </div>
    </div>
    <Level :propsUser="userSearched" :isAProfileDisplay="true" />
    <div>
      <h1 class="pt-10 text-2xl font-bold text-center" v-if="isAProfileDisplay">
        {{ userSearched.name }}'s favorite habits :
      </h1>
      <div class="flex flex-wrap items-center text-center justify-center gap-5">
        <div v-for="goal in goals.data.value" :key="goal._id">
          <Goal
            :goal="goal"
            :isAProfileDisplay="true"
            v-if="goal.displayedOnProfile"
          />
        </div>
      </div>
    </div>

    <div class="pt-10 text-2xl font-bold text-center">
      <h1>{{ userSearched.name }}'s challenges achieved :</h1>
      <div class="flex flex-wrap items-center text-center justify-center">
        <div v-for="chall in challenges" :key="chall._id">
          <Challenge :challenge="chall" :isAProfileDisplay="true" />
        </div>
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

let userSearched = await useFetch(`/api/user/${searchedUserId}`, {
  method: "GET",
});
userSearched = userSearched.data.value;

const goals = await useFetch(`/api/goal/list?userId=${searchedUserId}`, {
  method: "GET",
});

let challenges = await useFetch(
  `/api/challenges/list?userId=${searchedUserId}`,
  {
    method: "GET",
  }
);
// console.log(chall)
challenges = challenges.data.value.filter((chall) => chall.completed);

const isAProfileDisplay = ref(false);

const date = new Date(userSearched.createdAt);

const day = String(date.getDate()).padStart(2, "0");
const month = String(date.getMonth() + 1).padStart(2, "0"); // Les mois commencent à 0
const year = date.getFullYear();

const fullDate = `${day}/${month}/${year}`;

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
