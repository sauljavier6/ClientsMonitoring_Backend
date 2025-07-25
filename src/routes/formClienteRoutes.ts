// src/routes/authRoutes.ts
import express from 'express';
import { getUserByTelefono, createUser } from '../controllers/userController';

const router = express.Router();

router.post('/', createUser);
router.get('/', getUserByTelefono);

export default router;