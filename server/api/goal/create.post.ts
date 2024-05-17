import { Goal } from "~/server/models/Goal";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log("cc depuis create");
  console.log(body.dateEnd);

  if (!body) {
    throw createError({
      statusCode: 400,
      message: "Missing email or password",
      statusMessage: "Bad Request",
    });
  }

  const goal = await Goal.create(body);
  console.log(goal);
  return goal;
});
