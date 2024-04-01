import express from 'express';
import { getStudentByRollNoController } from '../controllers/getStudent.js';
import { deleteAllStudentsController } from '../controllers/deleteStudents.js';

const router = express.Router();


router.get('/:rollNo', getStudentByRollNoController);
router.delete('/deleteAllStudents' , deleteAllStudentsController);

export default router;
