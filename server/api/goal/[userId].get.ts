import { Goal } from "~/server/models/Goal";

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "userId");

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
