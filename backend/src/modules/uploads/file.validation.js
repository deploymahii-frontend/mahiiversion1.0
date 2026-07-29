export function validateImage(file) {
  if (!file) {
    throw new Error("Image is required");
  }

  const allowed = ["image/jpeg", "image/png", "image/webp"];

  if (!allowed.includes(file.mimetype)) {
    throw new Error("Invalid image format");
  }

  return true;
}
