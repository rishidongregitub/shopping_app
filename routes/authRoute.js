import express from "express";
import { registerController,loginController, testController } from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";

//Router
const router = express.Router();

//routing
//Register || Method post
router.post("/register", registerController);

//LOGIN || POST

router.post('/login',loginController)

//test routes
router.get('/test', requireSignIn, testController)


export default router;
