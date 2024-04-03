import express from 'express';
import { approveLabController} from '../controllers/approveController.js';

const router = express.Router();

router.post('/lab/:teacherId/:labName/:rollNo/:batch', approveLabController);

export default router;
