import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  console.log("cc");
  const { name, email, kindeId, profilePicture, pseudo } = await readBody(
    event
  );
  console.log("bosoiirrrr");
  console.log(name);
  // const createUser = await prisma.user
  //   .create({
  //     data: {
  //       email,
  //       kindeId,
  //       name,
  //       profilePicture,
  //       pseudo,
  //     },
  //   })
  //   .catch((err) => console.error(err));

  // return createUser;
  return "hola2";
});
