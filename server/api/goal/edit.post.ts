import { Goal } from "~/server/models/Goal";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const goal = await Goal.updateOne(
    { _id: body.goal.id },
    {
      $set: {
        name: body.goal.name,
        description: body.goal.description,
        icon: body.goal.icon,
        iconColor: body.goal.iconColor,
        displayedOnProfile: body.goal.displayed,
      },
    }
  );

  if (goal?.matchedCount === 0) {
    throw createError({
      statusCode: 404,
      message: "Goal not found",
      statusMessage: "Goal not found",
    });
  }
  console.log("g", goal);
  return goal;
});
