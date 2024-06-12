import { Goal } from "~/server/models/Goal";

export default defineEventHandler(async (event) => {
  const postId = getRouterParam(event, "id");

  const goal = await Goal.deleteOne({ _id: postId });

  if (goal.deletedCount === 0) {
    throw createError({
      statusCode: 404,
      message: "Goal not found",
      statusMessage: "Goal not found",
    });
  }

  return goal;
});
