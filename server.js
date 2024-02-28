import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";
import bodyParser from "body-parser";

//rest object
const app = express();

//config env
dotenv.config();

//database config
connectDB();

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

app.listen(port, () => {
  console.log(`Server Runnnig on ${process.env.DEV_MODE} mode on ${port}`);
});
