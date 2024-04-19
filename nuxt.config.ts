// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@sidebase/nuxt-auth", "nuxt-vuefire"],
  auth: {
    provider: {
      type: "authjs",
    },
  },
  runtimeConfig: {
    GithubClient: process.env.GITHUB_CLIENT_ID,
    GithubSecret: process.env.GITHUB_SECRET_SECRET,
  },
  vuefire: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      appId: process.env.FIREBASE_APP_ID,
      // there could be other properties depending on the project
    },
  },
});

//"@nuxtjs/tailwindcss",
/* tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },*/
