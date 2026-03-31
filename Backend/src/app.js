import express from 'express'
import authRouter from './routes/auth.routes.js'
import chatRouter from './routes/chat.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'

const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use(cors(
    {
        origin:['https://perplexity-gy2x.vercel.app',
            'http://localhost:3000'
        ],
    credentials:true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH']
    }
))

app.use('/api/auth',authRouter)
app.use('/api/chats',chatRouter)


export default app