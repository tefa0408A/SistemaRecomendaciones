import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { existsSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 5000;

app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Renombrar con fecha actual
  },
});

const upload = multer({ storage });

// Ruta para manejar la subida de archivos
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se subió ningún archivo" });
  }
  res.json({ imageUrl: `/uploads/${req.file.filename}`,  nombre: `${req.file.filename}` });
});

// Servir archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
