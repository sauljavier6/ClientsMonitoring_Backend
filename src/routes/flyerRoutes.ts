// src/routes/flyer.ts
import express from 'express';
import { updateFlyer, getAllFlyers, createFlyer } from '../controllers/flyerController';
import { upload } from '../middlewares/upload';

const router = express.Router();

router.put('/', upload.single('image'), updateFlyer);
router.get('/', getAllFlyers);
router.post('/', createFlyer);

export default router;
