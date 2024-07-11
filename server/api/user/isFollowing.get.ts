import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  //   const query = getQuery(event);
  const query = getQuery(event);

  const user = await User.findOne({ id: query.userId });

  return user?.followList.find((el) => el === query.userToFollowId);
  // console.log("userssss", users);
});
