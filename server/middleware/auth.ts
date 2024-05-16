import { getServerSession } from "#auth";

export default eventHandler(async (event) => {
  const session = await getServerSession(event);
  // FIXME: le session est null meme quand on est connect   https://sidebase.io/nuxt-auth/server-side/session-access-and-route-protection
  // if (!session) {
  //   throw createError({ statusMessage: "Unauthenticated", statusCode: 403 });
  // }
});
