<script setup>
const email = ref("");
const phone = ref("");
const password = ref("");
const { status, data, signIn, signOut, refresh } = useAuth();
async function signInWithCredentials() {
  // Probably you'll do some validation here before submitting to the backend
  // ...
  // This is the object that our backend expects for the `signIn` endpoint
  const credentials = {
    email: email.value,
    phone: phone.value,
    password: password.value,
  };
  try {
    // This sends a POST request to the `auth.provider.endpoints.signIn` endpoint with `credentials` as the body
    await signIn();
    alert("Successfully logged in!");
  } catch (error) {
    console.error(error);
  }
  console.log(status.value);
}
</script>
<template>
  <div>
    <h1>Enter your credentials to continue</h1>
    <input v-model="email" type="email" />
    <input v-model="phone" type="tel" />
    <input v-model="password" type="password" />
    <button @click="signInWithCredentials()">Sign In</button>
  </div>
</template>
