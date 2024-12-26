import { Router } from "express"
import { isAdmin } from '../admin/admin.middleware'
import { createPostController, deletePostController, getAllPostsController, getPostController, updatePostController } from "./post.controller"
import { isPostOwner } from "./post.middleware"

const router = Router()

router.get('/', getAllPostsController)
router.get('/:id', getPostController)
router.post('/create', isAdmin, createPostController)
router.put('/:id/edit', isPostOwner, updatePostController)
router.delete('/:id/delete', isPostOwner, deletePostController)

export default router