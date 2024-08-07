import { Goal } from "~/server/models/Goal";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const body = await readBody(event);

  console.log(body.goal, id);
  console.log("cc1");
  const goal = await Goal.findOneAndUpdate({ _id: body.id }, body.goal);
  console.log("cc2");
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
