import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, address, password, phone } = req.body;

    // Validation
    if (!name) {
      return res.status(400).send({ error: "Name is Required" });
    }
    if (!email) {
      return res.status(400).send({ error: "Email is Required" });
    }
    if (!address) {
      return res.status(400).send({ error: "Address is Required" });
    }
    if (!password) {
      return res.status(400).send({ error: "Password is Required" });
    }
    if (!phone) {
      return res.status(400).send({ error: "Phone is Required" });
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
    }).save();

    return res.status(201).send({
      success: true,
      message: 'User registered successfully',
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
