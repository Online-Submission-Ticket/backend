import express from 'express';
import { getStudentByRollNoController } from '../controllers/getStudent.js';

const router = express.Router();


,gffff

router.get('/:rollNo', getStudentByRollNoController);

export default router;
