import express from 'express';
import { getTeacherController } from '../controllers/getTeachers.js';

const router = express.Router();

router.get('/:email', getTeacherController);

export default router;
