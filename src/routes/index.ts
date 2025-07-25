import { Router } from 'express';
import formClienteRoutes from './formClienteRoutes';
import flyerRoutes from './flyerRoutes';

const router = Router();

// Prefijos para cada grupo de rutas
router.use('/form', formClienteRoutes);
router.use('/flyer', flyerRoutes);

export default router;