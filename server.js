import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import csvRoutes from "./routes/csvRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser";
import multer from 'multer';

//rest object
const app = express();

//config env
dotenv.config();

//database config
connectDB();

const storage = multer.memoryStorage(); // Store the file in memory as a buffer
const upload = multer({
  storage: storage, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'text/csv') {
        return cb(new Error('Only CSV files are allowed'));
    }
    cb(null, true);
  },
});

app.use(upload.single('Teacherfile')); // 'Teacherfile' should match the field name used in Postman


//configuring middleware
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
)

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080; //use port 8080 for development

//routes
app.use("/api/auth", authRoutes)
app.use("/api/teachers", csvRoutes);

app.listen(port, () => {
  console.log(`Server Runnnig on ${process.env.DEV_MODE} mode on ${port}`);
});
