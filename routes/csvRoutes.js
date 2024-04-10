import express from 'express';
import multer from 'multer';
import { uploadTeachersController } from '../controllers/teacherUploadController.js';
import { uploadStudentsController } from '../controllers/studentUploadController.js';

const router = express.Router();

// Configure multer storage
const storage = multer.memoryStorage(); // Store the file in memory as a buffer

// Create multer instance
const upload = multer({
  storage: storage, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'text/csv') {
        return cb(new Error('Only CSV files are allowed'));
    }
    cb(null, true);
  },
});

// Route handler for file upload
router.post('/upload-teachers', upload.single('dataFile'), uploadTeachersController);
router.post('/upload-students', upload.single('dataFile'), uploadStudentsController);



export default router;
