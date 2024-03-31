import express from 'express';
import { connectStuToLabTeacherController, connectStuToTheoryController ,
    connectStuToCCController} from '../controllers/connectStuToTeacher.js';

const router = express.Router();

router.get('/lab/:teacherId/:batch', connectStuToLabTeacherController);
router.get('/theory/:teacherId/:class', connectStuToTheoryController);
router.get('/:teacherId/cc', connectStuToCCController);

export default router;