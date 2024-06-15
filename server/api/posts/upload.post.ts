import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

export default defineEventHandler(async (event) => {
  let res: string[] = [];
  const files = await readMultipartFormData(event);

  files?.forEach((file) => {
    // Generate a unique filename with the same extension as the original file
    const fileExtension = path.extname(file.filename as string);
    const uniqueFilename = `${randomUUID()}${fileExtension}`;
    const relativePath = path.join("uploads", uniqueFilename);
    const filePath = path.join(process.cwd(), "public", relativePath);

    // Save the file with the new unique filename
    fs.writeFileSync(filePath, file.data);

    // Store the relative path in the response array
    res.push(`./${relativePath}`);
  });

  return res;
});
