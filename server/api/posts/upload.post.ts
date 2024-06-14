import path from "path";
import fs from "fs";

export default defineEventHandler(async (event) => {
  let res = [];
  const files = await readMultipartFormData(event);
  console.log(files);
  files?.forEach((file) => {
    const relativePath = path.join("uploads", file.filename as string);
    const filePath = path.join(process.cwd(), "public", relativePath);
    res.push(`./${relativePath}`);
    fs.writeFileSync(filePath, file.data);
  });
  console.log(res);
  return res;
});
