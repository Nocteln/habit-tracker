import { Goal } from "~/server/models/Goal";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  console.log("slt");
  // console.log(event);
  // const userId = getRouterParam(event, "userId");
  const id = event?.context?.params?.id;
  const session = await getServerSession(event);

  console.log("user", id);
  // console.log("session", session);

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

  const goals = await Goal.find({ userId: id });

  return goals;
});
