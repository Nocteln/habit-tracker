import { Goal } from "~/server/models/Goal";
import { getServerSession } from "#auth";
import { User } from "~/server/models/User";
import { randomInt } from "crypto";

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

  const updatedGoal = await Goal.updateOne(
    {
      _id: body.id,
    },
    {
      $set: { streak: body.streak, lastActivity: body.lastActivity },
    }
  );

  if (updatedGoal.matchedCount === 0) {
    throw createError({
      statusCode: 404,
      message: "Cannot find goal",
      statusMessage: "Bad Request",
    });
  }

  return updatedGoal;
});
