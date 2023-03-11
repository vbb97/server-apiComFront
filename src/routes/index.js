import express from "express";
const router = express.Router();

import userRoutes from './userRoutes';
import loginRoutes from './loginRoutes';
import contactRoutes from './contactRoutes';

router.use('/users', userRoutes);
router.use('/login', loginRoutes);
router.use('/contacts', contactRoutes);

export default router;