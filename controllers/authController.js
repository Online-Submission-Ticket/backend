import user from "../model/user.model.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const resetPasswordController = async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      
      // Validation
      if (!email || !newPassword) {
        return res.status(400).send({
          success: false,
          message: "Email and new password are required",
        });
      }
  
      // Check if user exists
      const foundUser = await user.findOne({ email });
      if (!foundUser) {
        return res.status(200).send({
          success: false,
          message: "Email is not registered",
        });
      }
  
      // Hash the new password
      const hashedPassword = await hashPassword(newPassword);
  
      // Update the user's password
      foundUser.password = hashedPassword;
      await foundUser.save();
  
      // Generate token
      const token = JWT.sign({ _id: foundUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      // Send response
      res.status(200).send({
        success: true,
        message: "Password reset successful",
        token,
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
    const { email, password } = req.body;
    
    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user exists
    const foundUser = await user.findOne({ email });
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

    // Generate token
    const token = JWT.sign({ _id: foundUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send response
    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
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

import User from "../model/user.model.js";

export const checkEmailController = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "Email is required",
            });
        }

        // Check if email exists in the database
        const existingUser = await User.findOne({ email });

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

