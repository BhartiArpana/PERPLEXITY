import { userModel } from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function register(req,res){
    const {name, email, password} = req.body
    const isAlredyExist = await userModel.findOne({email})

    if(isAlredyExist){
        return res.status(400).json({
            message:'User alredy exist with this email',
            success:false,
            err:'user already exist'
        })
    }

const hash = await bcrypt.hash(password,10)

     

    const user = await userModel.create({
        name,
        email,
        password:hash,
    })

    const mainVerificationToken = jwt.sign({
        email:user.email
    },process.env.JWT_SECRET)

    await sendEmail({
        to:email,
        subject:"Welcome to perplexity",
        html:`
        <P>hi ${name} </p>
       <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p> 
       <p>To get started, please verify your email address by clicking the link below:</p>
       <a href="http://localhost:3000/api/auth/verify-email?token=${mainVerificationToken}">Verify Email</a>
       <p>If you did not create an account, please ignore this email.</p> 
       <p>Best regards,<br>The Perplexity Team</p>
       `
    })

    res.status(201).json({
        message:'user registered successfully',
        success:true,
        user
    })

}

export async function login(req,res){
    const {email,password} = req.body
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        return res.status(400).json({
            message:'invalid email or password',
            success:false,
            err:'invalid email or password'
        })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(400).json({
            message:'invalid email or password',
            success:false,
            err:'invalid email or password'
        })
    }
    if(!user.verified){
        return res.status(400).json({
            message:'please verify your email before login',
            success:false,
            err:'email not verified'
        })
    }   
    const token = jwt.sign({
        email:user.email,
        id:user._id
    },process.env.JWT_SECRET)

    res.cookie('token',token)
    res.status(200).json({
        message:'user login successfully',
        success:true,
        user,
        token
    })

}

export async function getMe(req,res){
    const user = await userModel.findById(req.user.id)
    if(!user){
        return res.status(404).json({
            message:'user not found',
            success:false,
            err:'user not found'
        })
    }   
    res.status(200).json({
        message:'user fetched successfully',
        success:true,
        user
    })

}

export async function verifyEmail(req,res){
    const {token}= req.query

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    const user = await userModel.findOne({email:decoded.email})

    if(!user){
        return res.status(400).json({
            message:'invalid token',
            success:false,
            err:'invalid token'
        })
    }

    user.verified = true
    await user.save()

    const html = `
        <h1>Email verified successfully</h1>
        <p>Your email has been verified. you can now login in your account</p>
        <a href="http://localhost:3000/api/authlogin">Go to login</a>
    `
    res.send(html)
}