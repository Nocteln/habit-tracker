export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.log("error");
    // handle error, e.g. report to a service
    console.log(error);
  };

  nuxtApp.hook("vue:error", (err) => {
    console.log("error hook");
    console.log(err);
    //
  });
});
