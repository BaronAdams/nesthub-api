import { Router } from 'express'
import { login, signup, logout, getUserSession } from '../controllers/auth.controller'
import { loginValidator, registerValidator } from '../validators/auth.validator'
import { isAuthenticated } from '../middlewares/auth.middleware'

const router = Router()

router.post('/login',loginValidator,login)
router.post('/register',registerValidator,signup)
router.get('/logout',isAuthenticated,logout)
router.get('/me',isAuthenticated, getUserSession)

export default router