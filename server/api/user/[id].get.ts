import { User } from "~/server/models/User";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  // console.log(event);
  // const userId = getRouterParam(event, "userId");
  const id = event?.context?.params?.id;
  const session = await getServerSession(event);

  // if (!session) {
  //   throw createError({
  //     statusCode: 401,
  //     message: "Unauthorized",
  //     statusMessage: "Unauthorized",
  //   });
  // }

  if (!id) {
    throw createError({
      statusCode: 400,
      message: "Missing userId",
      statusMessage: "Bad Request",
    });
  }

  const user = await User.findOne({ id: id });

  return user;
});
