import { Router } from "express"
import { isAdmin, isPostOwner } from '../middlewares/auth.middleware'
import { createPostController, deletePostController, getAllPostsController, getPostController, updatePostController } from "../controllers/post.controller"
import { createPostValidator, updatePostValidator } from "../validators/post.validator"
import { getAllUsersController } from "@/controllers/user.controller"

const router = Router()

router.get('/', isAdmin, getAllUsersController)
router.get('/:id', getPostController)
router.post('/new', isAdmin, createPostValidator, createPostController)
router.put('/:id/edit', isPostOwner, updatePostValidator, updatePostController)
router.delete('/:id/delete', isPostOwner, deletePostController)

export default router