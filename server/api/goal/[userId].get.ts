import { Goal } from "~/server/models/Goal";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "userId");
  const session = await getServerSession(event);

  // console.log(userId);
  // console.log("session", session);

  // if (!session) {
  //   throw createError({
  //     statusCode: 401,
  //     message: "Unauthorized",
  //     statusMessage: "Unauthorized",
  //   });
  // }

  if (!userId) {
    throw createError({
      statusCode: 400,
      message: "Missing userId",
      statusMessage: "Bad Request",
    });
  }

  const goals = await Goal.find({ userId: userId });

  return goals;
});
