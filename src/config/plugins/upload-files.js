import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

export const uploadFile = (filename) => upload.single(filename);
