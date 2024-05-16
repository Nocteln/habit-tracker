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

  await User.updateOne(
    { id: body.id },
    {
      $set: { name: body.name, email: body.email, username: body.username },
    }
  );

  return "user updated";
});
