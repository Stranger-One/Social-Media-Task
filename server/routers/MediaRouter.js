import express from 'express';
import { upload } from '../utils/Cloudinary.js';
import MediaController from '../controllers/MediaController.js';
import AdminCheck from '../middlewares/AdminCheck.js';

const router = express.Router();

router.post('/upload', upload.array('files', 10), MediaController.uploadMedia);
router.get('/get-all', AdminCheck.adminCheck, MediaController.getAllMedia);
router.get('/get/:id', AdminCheck.adminCheck, MediaController.getMediaById);

export default router;
