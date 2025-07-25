import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import sequelize from "./config/database";
import indexRoutes from './routes/index';
import morgan from 'morgan';

dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// 🔥 Aquí expones la carpeta de imágenes
app.use('/public', express.static('public'));

// Agrupador de rutas
app.use('/api', indexRoutes);

const PORT = process.env.PORT || 4000;

sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Base de datos conectada");
  const PORT = Number(process.env.PORT) || 4000;
  app.listen(PORT, '0.0.0.0',() => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch(err => console.error("❌ Error al conectar BD:", err));