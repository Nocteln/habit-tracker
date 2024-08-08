import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  const users = await User.find({}).sort({ xp: -1 }).limit(10);

  return {
    users,
  };
});
