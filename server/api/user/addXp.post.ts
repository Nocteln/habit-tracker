import { getServerSession } from "#auth";
import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await getServerSession(event);
  if (!session) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
      statusMessage: "Unauthorized",
    });
  }

  if (!session?.user?.id) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
      statusMessage: "Unauthorized",
    });
  }

  if (!body) {
    throw createError({
      statusCode: 400,
      message: "Cannot find data",
      statusMessage: "Bad Request",
    });
  }

  const updatedUser = await User.updateOne(
    { id: session?.user?.id },
    {
      $inc: { xp: body.xp },
    }
  );

  if (updatedUser.matchedCount === 0) {
    throw createError({
      statusCode: 404,
      message: "Cannot find goal",
      statusMessage: "Bad Request",
    });
  }

  return updatedUser;
});
