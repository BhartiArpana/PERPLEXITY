import Router from 'express'
import { registerValidationRules,loginValidationRules } from '../validators/register.validator.js'
import { register ,verifyEmail,login,getMe} from '../controllers/auth.contoller.js'
import {userAuth} from '../middlewares/userAuth.middleware.js'

const authRouter = Router()

authRouter.post('/register', registerValidationRules(),register)
authRouter.post('/login', loginValidationRules(),login)
authRouter.get('/get-me',userAuth,getMe)

authRouter.get('/verify-email',verifyEmail)

export default authRouter