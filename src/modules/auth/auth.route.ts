import { Router } from 'express'
import { isAuthenticated } from './auth.middleware'
import { getUserSession, login, logout, signup } from './auth.controller'
import { registerValidator } from './validators/register-user.validator'

const router = Router()

router.post('/login',loginValidator,login)
router.post('/register',registerValidator,signup)
router.get('/logout',isAuthenticated,logout)
router.get('/me',isAuthenticated, getUserSession)

export default router