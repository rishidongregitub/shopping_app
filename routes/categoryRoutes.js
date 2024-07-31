import express from 'express'
import { createCategoryController } from '../controllers/categoryController'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware'


const router = express.Router()

router.post('create-category', requireSignIn,isAdmin, createCategoryController)

export default router