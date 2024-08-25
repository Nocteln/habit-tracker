// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  port: 3000,

  // , "@nuxtjs/kinde", "nuxt-mongoose",   "@nuxtjs/plausible",
  modules: [
    "@nuxt/ui",
    "@sidebase/nuxt-auth",
    "@pinia/nuxt",
    "@nuxtjs/plausible",
  ],

  runtimeConfig: {
    // GithubClient: process.env.GITHUB_CLIENT_ID,
    // GithubSecret: process.env.GITHUB_SECRET_SECRET,
    MongodbURI: process.env.MONGODB_URI,
    authSecret: process.env.AUTH_SECRET,
    GoogleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    GoogleClientId: process.env.GOOGLE_CLIENT_ID,
    DiscordClientSecret: process.env.DISCORD_CLIENT_SECRET,
    DiscordClientId: process.env.DISCORD_CLIENT_ID,
    CurrentUrl: process.env.CURRENT_URL,
    authOrigin: process.env.NUXT_AUTH_ORIGIN || "https://mydailytracking.com",
  },

  nitro: {
    plugins: ["~/server/index.ts"],
  },

  nuxtServerUtils: {
    mongodbUri: process.env.MONGODB_URI,
  },

  auth: {
    baseURL: process.env.NUXT_AUTH_ORIGIN,
    provider: {
      type: "authjs",
    },
  },

  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo_base.png" }],
    },
  },

  // mongoose: {
  //   uri: "process.env.MONGODB_URI",
  //   options: {},
  //   modelsDir: "models",
  // },
  ui: {
    notifications: {
      // Show toasts at the top right of the screen
      position: "top-0 bottom-auto",
    },
    safelistColors: ["elephant", "pacific-blue"],
  },

  compatibilityDate: "2024-08-12",
});

//"@nuxtjs/tailwindcss", "@sidebase/nuxt-auth", "nuxt-vuefire",
/* tailwindcss: {
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: {
      level: 2,
    },
    config: {},
    viewer: true,
  },*/

/*

  auth: {
    provider: {
      type: "authjs",
    },
  },vuefire: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      appId: process.env.FIREBASE_APP_ID,
      // there could be other properties depending on the project
    },
  },*/
