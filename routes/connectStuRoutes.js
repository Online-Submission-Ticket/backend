import express from 'express';
import { connectStuToLabTeacherController } from '../controllers/connectStuToTeacher.js';

const router = express.Router();

router.get('/:teacherId/:batch', connectStuToLabTeacherController);

export default router;