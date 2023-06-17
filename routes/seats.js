import express from "express"
import flight from "../models/flights.js"
import { create } from "domain"
import { createError } from "../utils/errors.js"
import { createSeat, updateSeats, deleteSeat, getSeat, getSeats } from "../controllers/seats.js"
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js"


const router = express.Router()

//Create 
router.post("/:flightid", verifyAdmin, createSeat)

//update
router.put("/:id",verifyAdmin, updateSeats)

//delete
router.delete("/:id/:flightid", verifyAdmin, deleteSeat)

//get
router.get("/:id", getSeat)

//getall
router.get("/", getSeats)


export default router