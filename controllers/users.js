import User from "../models/users.js"



export const updateuser= async(req,res,next)=>{
    try{
        const Updateduser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true });        
        res.status(200).json(Updateduser)
    }
    catch(err){
        next(err)
    }
}

export const deleteuser= async(req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Successfully deleted user")
    }
    catch(err){
        next(err)
    }
}

export const getuser= async(req,res,next)=>{
    try{
        const getusers=await User.findById(req.params.id)
        res.status(200).json(getusers)
    }
    catch(err){
        next(err)
    }
}

export const getusers= async(req,res,next)=>{
    try{
        const alluser=await User.find()
        res.status(200).json(alluser)
    }
    catch(err){
        next(err)
    }
}
