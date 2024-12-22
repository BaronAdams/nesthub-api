import { Router } from "express"
import { isAdmin } from '../admin/admin.middleware'
import { getAllUsersController, getUserController } from "./user.controller"

const router = Router()

router.get('/', isAdmin, getAllUsersController)
router.get('/:id', getUserController)
// router.post('/new', isAdmin, createPostValidator, createPostController)
// router.put('/:id/edit', isPostOwner, updatePostValidator, updatePostController)
// router.delete('/:id/delete', isPostOwner, deletePostController)

export default router