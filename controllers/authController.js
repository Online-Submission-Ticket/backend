import Student from "../model/student.model.js";
import Teacher from "../model/teacher.model.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";

export const resetPasswordController = async (req, res) => {
    try {
      const { emailID, newPassword } = req.body;
      
      // Validation
      if (!emailID || !newPassword) {
        return res.status(400).send({
          success: false,
          message: "Email and new password are required",
        });
      }
  
      // Check if the email is for a teacher
      const isTeacherEmail = emailID.includes("@pict.edu");
  
      // Check if user exists
      let foundUser;
      if (isTeacherEmail) {
        foundUser = await Teacher.findOne({ emailID });
      } else {
        foundUser = await Student.findOne({ emailID });
      }

      if (!foundUser) {
        return res.status(200).send({
          success: false,
          message: "emailID is not registered",
        });
      }
  
      // Hash the new password
      const hashedPassword = await hashPassword(newPassword);
  
      // Update the user's password and set isPasswordSet to true
      foundUser.password = hashedPassword;
      foundUser.isPasswordSet = true;
      await foundUser.save();
  
  
      // Send response
      res.status(200).send({
        success: true,
        message: "Password reset successful",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in resetting password",
        error,
      });
    }
};

export const loginController = async (req, res) => {
  try {
    const { emailID, password } = req.body;
    console.log(emailID);
    console.log(password);
    // Validation
    if (!emailID || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if the email is for a teacher
    const isTeacherEmail = emailID.includes("@pict.edu");

    // Check if user exists
    let foundUser;
    if (isTeacherEmail) {
      foundUser = await Teacher.findOne({ emailID });
    } else {
      foundUser = await Student.findOne({ emailID });
    }

    if (!foundUser) {
      return res.status(200).send({
        success: false,
        message: "Email is not registered. Please sign up",
      });
    }

    // Check if password matches
    const match = await comparePassword(password, foundUser.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password. Please enter correct password",
      });
    }

    // Send response
    res.status(200).send({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

export const checkEmailController = async (req, res) => {
    try {
        const { emailID } = req.body;

        // Check if email is provided
        if (!emailID) {
            return res.status(400).send({
                success: false,
                message: "Email is required",
            });
        }

        // Check if the email is for a teacher
        const isTeacherEmail = emailID.includes("@pict.edu");

        // Check if email exists
        let existingUser;
        if (isTeacherEmail) {
          existingUser = await Teacher.findOne({ emailID });
        } else {
          existingUser = await Student.findOne({ emailID });
        }

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Valid User",
            });
        } else {
            return res.status(200).send({
                success: true,
                message: "Email does not exist",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in checking email",
            error,
        });
    }
};
