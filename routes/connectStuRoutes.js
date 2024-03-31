import express from 'express';
import { connectStuToLabTeacherController, connectStuToTheoryController } from '../controllers/connectStuToTeacher.js';

const router = express.Router();

router.get('/lab/:teacherId/:batch', connectStuToLabTeacherController);
router.get('/theory/:teacherId/:class', connectStuToTheoryController);

export default router;