// src/config/database.ts
import { Sequelize } from 'sequelize-typescript';
import User  from '../models/User';
import dotenv from 'dotenv';
import Ticket from '../models/Ticket';
import Flyer from '../models/Flyer'; // ✅


dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User, Flyer, Ticket], // ✅ registra los modelos aquí
  logging: false,
});

export default sequelize;