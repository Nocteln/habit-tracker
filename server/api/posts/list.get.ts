import { Post } from "~/server/models/Post";

export default defineEventHandler(async (event) => {
  const posts = await Post.find({});

  return posts;
});
