export default defineEventHandler(async (event) => {
  console.log("cc");
  const postId = getRouterParam(event, "id");

  console.log(postId);

  return {
    hello: "world",
  };
});
