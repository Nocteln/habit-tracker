import path from "path";
import fs from "fs";

export default defineEventHandler(async (event) => {
  let res: string[] = [];
  const files = await readMultipartFormData(event);
  console.log(files);
  files?.forEach((file) => {
    console.log("1");
    const relativePath = path.join("uploads", file.filename as string);
    const filePath = path.join(process.cwd(), "public", relativePath);
    console.log("2");
    res.push(`./${relativePath}`);
    fs.writeFileSync(filePath, file.data);
    console.log("3");
  });
  console.log("r", res);
  return res;
});
