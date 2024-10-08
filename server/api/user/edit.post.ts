import { User } from "~/server/models/User";
import { getServerSession } from "#auth";
//TODO: changer que quand on update un user sa l'update aussi pour le useAuth

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

  await User.updateOne(
    { id: body.id },
    {
      $set: {
        name: body.name,
        username: body.username,
        settings: { notifications: body.notifications },
      },
    }
  );
  return "user updated";
});
