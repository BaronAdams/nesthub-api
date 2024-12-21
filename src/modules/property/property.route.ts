import { Router } from 'express'
import { createPropertyValidator, updatePropertyValidator } from './property.validator'
// import { isAuthenticated } from './auth.middleware'
import { createPropertyController, getPropertyController, getPropertiesController } from './property.controller'

const router = Router()

router.get('/',getPropertiesController)
router.get('/:id',getPropertyController)
router.post('/create',createPropertyValidator,createPropertyController)

export default router