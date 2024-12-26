import { Router } from "express"
import { createUserReviewValidator } from "./validators/create-user-review.validator"
import { isAuthenticated } from "../auth/auth.middleware"
import { createUserReviewController, deleteUserReviewController, updateUserReviewController } from "./user-review.controller"
import { isUserReviewOwner } from "./user-review.middleware"
import { updateUserReviewValidator } from "./validators/update-user-review.validator"

const router = Router()

// router.get('/', isAdmin, getAllUsersController)
// router.get('/:id', getUserController)
router.post('/create', isAuthenticated, createUserReviewValidator, createUserReviewController)
router.put('/:id/edit', isUserReviewOwner, updateUserReviewValidator, updateUserReviewController)
router.delete('/:id/delete', isUserReviewOwner, deleteUserReviewController)

export default router