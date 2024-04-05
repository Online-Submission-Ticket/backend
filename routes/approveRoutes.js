import express from 'express';
import { approveLabController, approveTheoryController, approveSubmissionController} from '../controllers/approveController.js';

const router = express.Router();

router.post('/lab/:teacherId/:labName/:rollNo/:batch', approveLabController);
router.post('/theory/:teacherId/:subjectName/:rollNo', approveTheoryController);
router.post('/cc/:teacherId/:rollNo', approveSubmissionController);

export default router;
