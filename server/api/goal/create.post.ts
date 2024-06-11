import { Goal } from "~/server/models/Goal";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body) {
    throw createError({
      statusCode: 404,
      message: "Missing body for the request",
      statusMessage: "Bad Request",
    });
  }

  const goal = await Goal.create(body);

  return goal;
});
