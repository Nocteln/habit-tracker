import { prisma } from "../../../prisma/db";

export default defineEventHandler(async (event) => {
  console.log("cc");
  const id = getRouterParam(event, "id");
  console.log(id);

  const user = await prisma.user.findMany({
    where: { kindeId: id },
  });

  return user;
});
