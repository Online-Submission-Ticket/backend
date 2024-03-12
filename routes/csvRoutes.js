import express from 'express';
import { uploadTeachersController } from '../controllers/teacherUploadController.js';

const router = express.Router();

router.post('/upload-teachers', uploadTeachersController);

export default router;
