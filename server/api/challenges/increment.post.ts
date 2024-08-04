import { getServerSession } from "next-auth";
import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await getServerSession();

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
  console.log(body.challengeId);
  const updatedUser = await User.updateOne(
    {
      id: session?.user?.id,
      "challenges.id": body.challengeId,
    },
    {
      $inc: {
        "challenges.$.count": 1,
      },
    }
  );
});
