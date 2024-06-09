import { getServerSession } from "#auth";
import { Goal } from "~/server/models/Goal";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const session = await getServerSession(event);
  console.log("id", id);
  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
      statusMessage: "Unauthorized",
    });
  }

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Missing userId",
      statusMessage: "Bad Request",
    });
  }

  await Goal.deleteOne({
    _id: id,
  });

  console.log("deleted");

  return "delete";
});
