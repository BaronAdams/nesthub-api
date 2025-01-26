import { Router } from 'express'
import { createPropertyController, getPropertyController, getPropertiesController, likeOrUnlikePropertyController, saveOrUnSavePropertyController, updatePropertyController } from './property.controller'
import { isSeller } from '../user/user.middleware'
import { createPropertyValidator } from './validators/create-property.validator'
import { isAuthenticated } from '../auth/auth.middleware'
import { isPropertyOwner } from './property.middleware'
import { updatePropertyValidator } from './validators/update-property.validator'

const router = Router()

router.get('/',getPropertiesController)
router.get('/recommanded',isAuthenticated,getPropertiesController)
router.get('/trending',getPropertiesController)
router.get('/latest',getPropertiesController)
router.get('/:id',getPropertyController)
router.put('/:id/edit',isPropertyOwner,updatePropertyValidator, updatePropertyController)
router.post('/create',isSeller, createPropertyValidator, createPropertyController)
router.put('/:id/like',isAuthenticated, likeOrUnlikePropertyController)
router.put('/:id/save',isAuthenticated, saveOrUnSavePropertyController)

export default router