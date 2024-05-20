import { Goal } from "~/server/models/Goal";
import { getServerSession } from "#auth";

export default defineEventHandler(async (event) => {
  console.log("complete back");
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

  console.log(body.id);

  const updatedGoal = await Goal.updateOne(
    {
      _id: body.id,
    },
    {
      $set: { streak: body.newStreak, lastActivity: body.newConnexionDate },
    }
  );
  console.log("goal", updatedGoal);

  if (updatedGoal.matchedCount === 0) {
    throw createError({
      statusCode: 404,
      message: "Cannot find goal",
      statusMessage: "Bad Request",
    });
  }

  return "updated";
});
