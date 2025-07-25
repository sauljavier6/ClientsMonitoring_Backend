// src/middlewares/upload.ts
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public'); // asegúrate que esta carpeta exista
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `flyer${ext}`); // o puedes usar Date.now() si quieres nombre único
  }
});

export const upload = multer({ storage });
