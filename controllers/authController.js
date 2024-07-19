import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, address, password, phone } = req.body;

    // Validation
    if (!name) {
      return res.status(400).send({ message: "Name is Required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is Required" });
    }
    if (!address) {
      return res.status(400).send({ message: "Address is Required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone is Required" });
    }
    if (!answer) {
      return res.status(400).send({ message: "Answer is Required" });
    }

    // Check User
    const existingUser = await userModel.findOne({ email });

    // Existing User
    if (existingUser) {
      return res.status(409).send({
        success: false,
        message: "Already registered, please log in.",
      });
    }

    // Register User
    const hashedPassword = await hashPassword(password);

    // Save User
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer
    }).save();

    return res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// POST LOGIN
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

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // Token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).send({
      success: true,
      message: "Login Success",
      token, // Include token in the response
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const {email,question,newPassword} = req.body
    if(!email){
      res.status(400).send({ message:"Email is required"})
    }
    if(!answer){
      res.status(400).send({ message:"Answer is required"})
    }
    if(!newPassword){
      res.status(400).send({ message:"New Password is required"})
    }

    //Check 

    const user = await userModel.findOne({email,answer})
    //validation
    if(!user){
      return res.status(404).send({
        success : false,
        message : "Wrong Email Or Answer"
      })
    }
  const hashed = await hashPassword(newPassword)
  await userModel.findByIdAndUpdate(user._id,{password:hashed})
  res.status(200).send({
    success: true,
    message : "Password Reset Successfully",
  })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  res.send(`Protected Route`);
};
