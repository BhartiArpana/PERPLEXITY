import { userModel } from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
import bcrypt from 'bcryptjs'

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
        success:true
    })

    await sendEmail({
        to:email,
        subject:"Welcome to perplexity",
        html:`
        <P>hi ${name} </p>
       <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p> 
          <p>Best regards,<br>The Perplexity Team</p>
       `
    })

    res.status(201).json({
        message:'user regiser successfully',
        success:true,
        user
    })

}