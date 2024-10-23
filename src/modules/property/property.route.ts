import { Router } from 'express'
import { createPropertyValidator, updatePropertyValidator } from './property.validator'
// import { isAuthenticated } from './auth.middleware'
import { createPropertyController, getPropertyController, getPropertiesController } from './property.controller'

const router = Router()

router.post('/create',createPropertyValidator,createPropertyController)
router.get('/:id',getPropertyController)
router.get('/',getPropertiesController)

export default router