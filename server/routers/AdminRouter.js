import express from 'express';
import AdminController from '../controllers/AdminController.js';

const router = express.Router();

// Admin signup route
router.post('/signup', AdminController.adminSignup);

// Admin login route
router.post('/login', AdminController.adminLogin);

export default router;
