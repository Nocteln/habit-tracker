import { getServerSession } from "next-auth";
import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // const session = await getServerSession(event);
  // console.log("cc1");
  // if (!session) {
  //   throw createError({
  //     statusCode: 401,
  //     message: "Unauthorized",
  //     statusMessage: "Unauthorized",
  //   });
  // }

  if (!body) {
    throw createError({
      statusCode: 400,
      message: "Cannot find data",
      statusMessage: "Bad Request",
    });
  }

  // TODO: faire que l'id soit reactif
  const updatedUser = await User.updateOne(
    {
      id: "562693590514532362",
      "challenges.id": body.challengeId,
    },
    {
      $inc: {
        "challenges.$.count": 1,
      },
    }
  );
});
