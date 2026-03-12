import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name required for register']
    },
    email:{
       type:String,
       required:[true,"email required for register"],
       unique:true
    },
    password:{
        type:String,
        required:[true,'password required for register'],
        Select:false
    },
    success:{
        type:Boolean
    },
    
},{
    timestamps:true
})

export const userModel = mongoose.model('users',userSchema)

