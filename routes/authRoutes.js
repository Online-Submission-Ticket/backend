import express from "express";
const router = express.Router();

import{
    registerController,
    loginController
}from "../controllers/authController.js"

//routing 
//register  post method
router.post("/register", registerController);

//login method post
router.post("/login", loginController);
export default router;