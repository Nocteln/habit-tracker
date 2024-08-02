import { User } from "~/server/models/User";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const userId = query.userId;

  const session = await getServerSession(event);
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

  const user = await User.findOne({ id: userId });

  const goals = user?.challenges;

  return goals;
});
