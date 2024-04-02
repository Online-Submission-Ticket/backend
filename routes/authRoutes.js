import express from "express";
const router = express.Router();

import{
    resetPasswordController,
    loginController,
    checkEmailController
}from "../controllers/authController.js"

//routing 
//register  post method
router.post("/reset/password", resetPasswordController);

//login method post
router.post("/login", loginController);

router.post("/checkMailValidity" , checkEmailController);
export default router;