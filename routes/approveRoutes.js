import express from 'express';
import { approveLabController, approveTheoryController} from '../controllers/approveController.js';

const router = express.Router();

router.post('/lab/:teacherId/:labName/:rollNo/:batch', approveLabController);
router.post('/theory/:teacherId/:subjectName/:rollNo', approveTheoryController);

export default router;
