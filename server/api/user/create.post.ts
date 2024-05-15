import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  console.log("cc depuis create");

  if (!body.email || !body.name || !body.id) {
    throw createError({
      statusCode: 400,
      message: "Missing email or password",
      statusMessage: "Bad Request",
    });
  }

  const user = await User.create(body);

  return user;
});
