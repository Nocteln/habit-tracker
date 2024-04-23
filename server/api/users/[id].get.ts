export default defineEventHandler((event) => {
  console.log("cc");
  const id = getRouterParam(event, "id");
  console.log(id);
  return "hola";
});
