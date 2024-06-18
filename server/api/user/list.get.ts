import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const str = (query.str as string) || "";

  const regex = new RegExp("^" + str, "i");

  const users = await User.find({ username: regex });

  console.log("userssss", users);

  return {
    users,
  };
});
