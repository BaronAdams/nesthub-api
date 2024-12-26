import { Router } from "express"
import { createPropertyReviewValidator } from "./validators/create-property-review.validator"
import { isAuthenticated } from "../auth/auth.middleware"
import { createPropertyReviewController, deletePropertyReviewController, updatePropertyReviewController } from "./propertyreview.controller"
import { isPropertyReviewOwner } from "./propertyreview.middleware"
import { updatePropertyReviewValidator } from "./validators/update-property-review.validator"

const router = Router()

// router.get('/', isAdmin, getAllUsersController)
// router.get('/:id', getUserController)
router.post('/create', isAuthenticated, createPropertyReviewValidator, createPropertyReviewController)
router.put('/:id/edit', isPropertyReviewOwner, updatePropertyReviewValidator, updatePropertyReviewController)
router.delete('/:id/delete', isPropertyReviewOwner, deletePropertyReviewController)

export default router