import { User } from "~/server/models/User";
import { getServerSession } from "#auth";

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

  if (!body) {
    throw createError({
      statusCode: 400,
      message: "Cannot find data",
      statusMessage: "Bad Request",
    });
  }

  console.log("salutation");

  const updatedUser = await User.updateOne(
    {
      id: session?.user?.id,
      "challenges.id": body.challengeId,
    },
    {
      $set: {
        "challenges.$.completed": true,
        xp: body.xp,
      },
    }
  );

  if (updatedUser.matchedCount === 0) {
    throw createError({
      statusCode: 404,
      message: "Cannot find user",
      statusMessage: "Bad Request",
    });
  }

  console.log(updatedUser);
});
