import Router from 'express'
import { registerValidationRules,loginValidationRules } from '../validators/register.validator.js'
import { register ,verifyEmail,login} from '../controllers/auth.contoller.js'

const authRouter = Router()

authRouter.post('/register', registerValidationRules(),register)
authRouter.post('/login', loginValidationRules(),login)

authRouter.get('/verify-email',verifyEmail)

export default authRouter