import { create } from "domain";
import user from "../models/users.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/errors.js";
import jwt from "jsonwebtoken"


//register
export const register = async(req,res,next)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    console.log(req.body.username)
    try{
        // const { username, email, password} = req.body;
        // const salt = bcrypt.genSaltSync(10);
        // const hash = bcrypt.hashSync(password, salt);
        const newUser= new user({
            username:req.body.username,
            email:req.body.email,
            password:hash,
        })

        await newUser.save()
        res.status(200).send({message:"User created successfully"})
    }
    catch(err){
        next(err)
    }
}

//login
export const login = async(req,res,next)=>{
    try{
        // const { username, passwords} = req.body;
        const users=await user.findOne({username :req.body.username})
        if(!users) return next(createError(404,"User not found"))

        const ispasswordcorrect = await bcrypt.compare(req.body.password, users.password)
        if(!ispasswordcorrect) return next(createError(400,"Incorrect username or password"))

        const { password, isAdmin, ...otherDetails } = users._doc;
        const token=jwt.sign({id:users._id, isAdmin:users.isAdmin}, process.env.JWT)
        res.cookie("access_token",token,{httpOnly:true,}).status(200).json({...otherDetails});
        // res.cookie("access_token",token,{httpOnly:true,}).status(200).send({message: "success"});
    }
    catch(err){
        next(err)
    }
}