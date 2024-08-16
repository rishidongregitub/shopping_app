import express from "express";
import {
  categoryController,
  createCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//Create Category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//Update Category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//Get All Category
router.get('/get-category', categoryController)

// single category
router.get('/single-category/:slug', singleCategoryController)
export default router;
