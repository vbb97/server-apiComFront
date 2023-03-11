import express from "express";
const router = express.Router();

import userRoutes from './userRoutes';
import loginRoutes from './loginRoutes';
import contactRoutes from './contactRoutes';

router.get('/', (req, res) => {
    return res.status(200).json({ message: 'Tudo funcionado.' });
});
router.use('/users', userRoutes);
router.use('/login', loginRoutes);
router.use('/contacts', contactRoutes);

export default router;