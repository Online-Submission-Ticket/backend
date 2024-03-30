import express from 'express';
import { getStudentByRollNoController } from '../controllers/getStudent.js';

const router = express.Router();

router.get('/:rollNo', getStudentByRollNoController);

export default router;
