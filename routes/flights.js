import express from "express"
import flight from "../models/flights.js"
import { create } from "domain"
import { createError } from "../utils/errors.js"
import { createFlight, updateFlight, deleteFlight, getFlight, getFlights } from "../controllers/flights.js"
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js"


const router = express.Router()

//Create 
router.post("/", verifyAdmin, createFlight)

//update
router.put("/:id",verifyAdmin, updateFlight)

//delete
router.delete("/:id", verifyAdmin, deleteFlight)

//get
router.get("/:id", getFlight)

//getall
router.get("/", getFlights)


export default router