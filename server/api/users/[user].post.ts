import { prisma } from "../../../prisma/db";

export default defineEventHandler(async (event) => {
  console.log("cc");
  const { user: userInfo } = await readBody(event);
  // console.log(userInfo);

  if (!userInfo)
    return "error while fetching user : not user found ([user].post.ts]";
  let { email, id, name, picture, given_name } = userInfo;
  let newUser;

  if (picture === "" || picture === null)
    picture =
      "https://imebehavioralhealth.com/wp-content/uploads/2021/10/user-icon-placeholder-1.png";

  try {
    const user = await prisma.user.findMany({
      where: {
        kindeId: userInfo.id,
      },
    });

    if (user.length > 0) {
      return {
        user: user[0],
      };
    } else {
      newUser = await prisma.user.create({
        data: {
          email,
          kindeId: id,
          name,
          profilePicture: picture,
          pseudo: given_name,
        },
      });
    }

    return {
      user: newUser,
    };
  } catch (error) {
    console.error(error);
  }
});
