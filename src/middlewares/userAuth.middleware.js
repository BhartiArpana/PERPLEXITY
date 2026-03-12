import jwt from 'jsonwebtoken'

export async function userAuth(req,res,next){
    const token = req.cookies.token
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