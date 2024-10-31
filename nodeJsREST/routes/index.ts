import express from 'express';
import authMiddleware from '../middleware/authMiddleware';

const publicRoutes = require('./publicRoutes');
const authRoutes = require('./authRoutes');
// const protectedRoutes = require('./protectedRoutes');

const router = express.Router();

router.use('/public', publicRoutes);
router.use('/auth', authRoutes);
// router.use('/user', authMiddleware, protectedRoutes);

module.exports = router;