import express from "express";
import { registerController,loginController, testController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//Router
const router = express.Router();

//routing
//Register || Method post
router.post("/register", registerController);

//LOGIN || POST

router.post('/login',loginController)

//test routes
router.get('/test', requireSignIn, isAdmin, testController)

//protected route
router.get("/user-auth", requireSignIn, (req,res)=>{
    res.status(200).send({ok:true})
})

export default router;
