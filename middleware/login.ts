export default defineNuxtRouteMiddleware(() => {
  const { status } = useAuth();

  if (status.value === "authenticated") {
    return navigateTo("/app/profile");
  }
});
