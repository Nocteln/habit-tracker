import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

// Fonction pour vérifier les signatures binaires des images courantes
const isImage = (buffer: Buffer) => {
  const signatures: { [key: string]: string[] } = {
    jpg: ["ffd8ff"],
    png: ["89504e47"],
    gif: ["47494638"],
    webp: ["52494646"], // WebP files start with "RIFF" and contain "WEBP" in the first 12 bytes
  };

  const hexSignature = buffer.slice(0, 4).toString("hex");
  return Object.values(signatures).some((sigArray) =>
    sigArray.some((sig) => hexSignature.startsWith(sig))
  );
};

export default defineEventHandler(async (event) => {
  let res: string[] = [];
  const files = await readMultipartFormData(event);

  for (const file of files || []) {
    // Vérifiez si le fichier est une image
    if (!isImage(file.data)) {
      continue; // Ignore les fichiers qui ne sont pas des images
    }

    // Générer un nom de fichier unique avec la même extension que le fichier original
    const fileExtension = path.extname(file.filename as string);
    const uniqueFilename = `${randomUUID()}${fileExtension}`;
    const relativePath = path.join("uploads", uniqueFilename);
    const filePath = path.join(process.cwd(), "public", relativePath);

    // Enregistrer le fichier avec le nouveau nom unique
    fs.writeFileSync(filePath, file.data);

    // Stocker le chemin relatif dans le tableau de réponse
    res.push(`./${relativePath}`);
  }

  return res;
});
