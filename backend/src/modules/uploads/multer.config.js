import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";

const uploadPath = path.resolve("storage/temp");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },

  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${uuid()}${ext}`);
  },
});

export default multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
