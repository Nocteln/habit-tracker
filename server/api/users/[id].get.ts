export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id");
  console.log(id);
  return id;
});
