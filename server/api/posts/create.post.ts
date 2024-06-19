import { getServerSession } from "#auth";
import { Post } from "~/server/models/Post";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await getServerSession(event);

  if (!body) {
    throw createError({
      statusCode: 404,
      message: "Missing body for the request",
      statusMessage: "Bad Request",
    });
  }

  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Your not authorized to do this",
      statusMessage: "Unothorized",
    });
  }
  const post = await Post.create(body);
});
