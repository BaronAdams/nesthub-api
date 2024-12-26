import { Router } from 'express'
import { createPropertyController, getPropertyController, getPropertiesController, likeOrUnlikePropertyController, saveOrUnSavePropertyController } from './property.controller'
import { likeOrSavePropertyValidator } from './validators/like-or-save-property.validator'
import { isSeller } from '../user/user.middleware'
import { createPropertyValidator } from './validators/create-property.validator'

const router = Router()

router.get('/',getPropertiesController)
router.get('/:id',getPropertyController)
router.post('/create',isSeller, createPropertyValidator, createPropertyController)
router.post('/:id/like',likeOrSavePropertyValidator,likeOrUnlikePropertyController)
router.post('/:id/save',likeOrSavePropertyValidator,saveOrUnSavePropertyController)

export default router