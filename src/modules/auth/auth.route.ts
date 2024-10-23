import { Router } from 'express'
import { isAuthenticated } from './auth.middleware'
import { getUserSession, login, logout, signup } from './auth.controller'
import { registerUserValidator } from './validators/register-user.validator'
import { loginUserValidator } from './validators/login-user.validator'

const router = Router()

router.post('/login',loginUserValidator,login)
router.post('/register',registerUserValidator,signup)
router.get('/logout',isAuthenticated,logout)
router.get('/me',isAuthenticated, getUserSession)

export default router