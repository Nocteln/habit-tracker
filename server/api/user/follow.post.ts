import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.userToFollowId || !body.userId) {
    throw createError({
      statusCode: 400,
      message: "Missing Ids",
      statusMessage: "Bad Request",
    });
  }

  if (body.isFollowing) {
    await User.updateOne(
      { id: body.userId },
      { $pull: { followList: body.userToFollowId } }
    );
  } else {
    await User.updateOne(
      { id: body.userId },
      { $push: { followList: body.userToFollowId } }
    );
  }

  return "updated";
});
