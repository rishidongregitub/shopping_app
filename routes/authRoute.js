import express from "express";
import { registerController,loginController, testController, forgotPasswordController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//Router
const router = express.Router();

//routing
//Register || Method post
router.post("/register", registerController);

//LOGIN || POST

router.post('/login',loginController)

//Forgot Password

router.post('/forgot-password', forgotPasswordController )

//test routes
router.get('/test', requireSignIn, isAdmin, testController)

//user protected route
router.get("/user-auth", requireSignIn, (req,res)=>{
    res.status(200).send({ok:true})
})

//admin protected route
router.get("/admin-auth", requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({ok:true})
})

export default router;
