import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import csvRoutes from "./routes/csvRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
<<<<<<< HEAD
import studentRoutes from "./routes/studentRoutes.js";
import connectStuRoutes from "./routes/connectStuRoutes.js";
=======
>>>>>>> 13bd285f952f215053577cb084337080333fa754

import connectDB from "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser";

//rest object
const app = express();

//config env
dotenv.config();

//database config
connectDB();

//configure middleware
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
app.use("/api/upload/students" , csvRoutes);
app.use("/api/getTeacher", teacherRoutes);
<<<<<<< HEAD
app.use("/api/getStudent" , studentRoutes);
app.use('/api/connectStu', connectStuRoutes);
app.use('/api/connectStuToCC', connectStuRoutes);
=======
app.use("/api/student" , studentRoutes);
>>>>>>> 13bd285f952f215053577cb084337080333fa754

app.listen(port, () => {
  console.log(`Server Runnnig on ${process.env.DEV_MODE} mode on ${port}`);
});
