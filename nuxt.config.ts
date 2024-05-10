// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },
  modules: ["nuxt-mongoose", "@nuxt/ui", "@nuxtjs/kinde"], // ,
  runtimeConfig: {
    GithubClient: process.env.GITHUB_CLIENT_ID,
    GithubSecret: process.env.GITHUB_SECRET_SECRET,
    MongodbURI: process.env.MONGODB_URI,
  },
  nitro: {
    plugins: ["~/server/index.ts"],
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
