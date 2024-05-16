import { User } from "~/server/models/User";

export default defineEventHandler(async (event) => {
  console.log("cc depuis update");
  const { user } = readBody(event);

  await User.updateOne(user);
  console.log("updated");
  return "user updated";
});
