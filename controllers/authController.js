import user from "../model/user.model.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req,res) =>{
    try{
        const{name, email, password, phone, roll_no, division} = req.body;

        if(!name){
            return res.send({message: "Name is required"});
        }
        if(!email){
            return res.send({message:"Email is required"});
        }
        if(!password){
            return res.send({message:"Password is required"});
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
          }
        if(!roll_no) {
            return res.send({message:"Roll No. is Required" });
        }
        if(!division){
            return res.send({message:"Division no is Required" });
        }

    //check user
    const exisitingUser = await user.findOne({ email });
    //exisiting user
    if (exisitingUser) {
        return res.status(200).send({
        success: false,
        message: "Already Register please login",
        });
    }

    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const newuser = await new user({
        name,
        email,
        password,
        phone,
        roll_no,
        division,
        password: hashedPassword,
    }).save();

    res.status(201).send({
        success: true,
        message: "Registered successfully",
        newuser,
    });

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error,
        });
    }
};


//POST LOGIN
// POST LOGIN
export const loginController = async (req, res) => {
  try {
      const { email, password } = req.body;
      // validation
      if (!email || !password) {
          return res.status(400).send({
              success: false,
              message: "Invalid email or password",
          });
      }
      // check user
      const foundUser = await user.findOne({ email });
      if (!foundUser) {
          return res.status(200).send({
              success: false,
              message: "Email is not registered!! Please sign up",
          });
      }

      const match = await comparePassword(password, foundUser.password);
      if (!match) {
          return res.status(200).send({
              success: false,
              message: "Invalid Password please enter correct password",
          });
      }
      // token
      const token = await JWT.sign({ _id: foundUser._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
      });
      res.status(200).send({
          success: true,
          message: "Login successfully",
          user: {
              _id: foundUser._id,
              name: foundUser.name,
              email: foundUser.email,
              phone: foundUser.phone,
              roll_no: foundUser.roll_no,
              division: foundUser.division,
          },
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
