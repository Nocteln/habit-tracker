// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "nuxt-server-utils", "@sidebase/nuxt-auth"], // , "@nuxtjs/kinde", "nuxt-mongoose",
  runtimeConfig: {
    // GithubClient: process.env.GITHUB_CLIENT_ID,
    // GithubSecret: process.env.GITHUB_SECRET_SECRET,
    MongodbURI: process.env.MONGODB_URI,
    authSecret: process.env.AUTH_SECRET,
    GoogleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    GoogleClientId: process.env.GOOGLE_CLIENT_ID,
    DiscordClientSecret: process.env.DISCORD_CLIENT_SECRET,
    DiscordClientId: process.env.DISCORD_CLIENT_ID,
    FacebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    FacebookClientId: process.env.FACEBOOK_CLIENT_ID,
    CurrentUrl: process.env.CURRENT_URL,
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },

  nuxtServerUtils: {
    mongodbUri: process.env.MONGODB_URI,
  },

  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: "authjs",
    },
  },
  // mongoose: {
  //   uri: "process.env.MONGODB_URI",
  //   options: {},
  //   modelsDir: "models",
  // },
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
