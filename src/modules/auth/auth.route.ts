import { Router } from 'express'
import { isAuthenticated } from './auth.middleware'
import { getUserSession, login, logout, signup, signupMany, updateUserInfo } from './auth.controller'
import { registerUserValidator } from './validators/register-user.validator'
import { loginUserValidator } from './validators/login-user.validator'
import { registerManyUsersValidator } from './validators/register-many-user.validator'
import { updateUserValidator } from './validators/update-user.validator'

const router = Router()

router.post('/login',loginUserValidator,login)
router.post('/register',registerUserValidator,signup)
router.post('/register-many',registerManyUsersValidator,signupMany)
router.get('/logout',isAuthenticated,logout)
router.get('/me',isAuthenticated, getUserSession)
router.put('/me/edit',isAuthenticated, updateUserValidator, updateUserInfo)

export default router