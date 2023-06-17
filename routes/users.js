import express from "express"
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js"

import { updateuser, deleteuser, getuser, getusers } from "../controllers/users.js"

const router = express.Router()

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//     res.send("You are authenticated baby")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("You are valid user to delete account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("You are valid user to delete any account")
// })

//update
router.put("/:id",verifyUser, updateuser)

//delete
router.delete("/:id", verifyUser, deleteuser)

//get
router.get("/:id", verifyUser, getuser)

//getall
router.get("/", verifyAdmin, getusers)


export default router