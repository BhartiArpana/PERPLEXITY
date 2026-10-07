import jwt from 'jsonwebtoken'

export async function userAuth(req,res,next){
    const authHeader = req.headers.authorization
    const headerToken = authHeader?.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : null

    const token = headerToken || req.cookies?.token
    // console.log("auth header:", req.headers.authorization)
    if(!token){
        return res.status(401).json({
            message:'unauthorized',
            success:false,
            err:'no token provided'
        })
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({
            message:'unauthorized',
            success:false,
            err:'invalid token'
        })
    }
    
}