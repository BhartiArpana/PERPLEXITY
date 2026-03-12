import Router from 'express'
import { registerValidationRules } from '../validators/register.validator.js'
import { register } from '../controllers/auth.contoller.js'

const authRouter = Router()

authRouter.post('/register', registerValidationRules(),register)

export default authRouter