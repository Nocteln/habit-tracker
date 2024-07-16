import { Goal } from "~/server/models/Goal";
import { getServerSession } from "#auth";
//TODO: changer que quand on update un user sa l'update aussi pour le useAuth

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await getServerSession(event);

  // console.log("body", body.streak);

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

  const g = await Goal.updateOne(
    { _id: body.id },
    {
      $set: { streak: body.streak },
    }
  );

  return "goal updated";
});
