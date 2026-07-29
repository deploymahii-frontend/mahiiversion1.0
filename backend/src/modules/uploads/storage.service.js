import fs from "fs";
import path from "path";

const rootStorage = path.resolve("storage");

export function getStoragePath(subfolder) {
  return path.join(rootStorage, subfolder);
}

export async function storeFile(file, subfolder) {
  if (!file) {
    throw new Error("File is required");
  }

  const destinationFolder = getStoragePath(subfolder);
  await fs.promises.mkdir(destinationFolder, { recursive: true });

  const destinationPath = path.join(destinationFolder, file.filename);
  await fs.promises.rename(file.path, destinationPath);

  return {
    originalName: file.originalname,
    mimeType: file.mimetype,
    size: file.size,
    filename: file.filename,
    path: destinationPath,
    url: `/storage/${subfolder}/${file.filename}`,
  };
}

export async function removeTempFile(file) {
  if (!file || !file.path) {
    return;
  }

  try {
    await fs.promises.unlink(file.path);
  } catch (error) {
    // ignore cleanup errors
  }
}
