import { prisma } from "../../../prisma/db";

export default defineEventHandler(async (event) => {
  console.log("cc");
  const id = getRouterParam(event, "id");
  if (!id) return "error while fetching user : not id found";
  console.log(id);
  const user = await prisma.user.findMany({
    where: { kindeId: id },
  });

  if (user) {
    return user;
  } else {
    prisma.user.create({
      data: {
        kindeId: id,
        email: "",
        name: "",
        profilePicture: "",
        pseudo: "",
      },
    });
  }

  return user;
});

/*import { prisma } from '../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
    const { email } = await readBody(event);

    try {
        const user = await prisma.user.findMany({
            where: {
                email: email
            }
        });

        return user;
    }
    catch(error) {
        console.error(error);
    }
});*/
