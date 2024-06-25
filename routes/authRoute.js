import express from "express";
import { registerController,loginController } from "../controllers/authController.js";

//Router
const router = express.Router();

//routing
//Register || Method post
router.post("/register", registerController);

//LOGIN || POST

router.post('/login',loginController)
export default router;
