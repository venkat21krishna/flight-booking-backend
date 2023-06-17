import Seat from "../models/seats.js";
import flight from "../models/flights.js";
import { createError } from "../utils/errors.js";

export const createSeat = async (req, res, next) => {
    const flightId = req.params.flightid;
    const newSeat = new Seat(req.body);

    try {
        const savedSeat = await newSeat.save();
        try {
        await flight.findByIdAndUpdate (flightId, {$push: { seats: savedSeat._id }, });
        } catch (err) {
        next(err);
        } 
    res.status (200).json (savedSeat);
    } catch (err) {
        next (err);
        }
};

export const updateSeats= async(req,res,next)=>{
    try{
        const UpdatedSeat = await Seat. findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true });        
        res.status(200).json(UpdatedSeat)
    }
    catch(err){
        next(err)
    }
}

export const deleteSeat= async(req,res,next)=>{
    const flightId = req.params.flightid;
    try {
        await Seat.findByIdAndDelete(req.params.id)
        try {
        await flight.findByIdAndUpdate (flightId, {$pull:{seats:req.params._id}})
        } catch (err) {
        next(err);
        } 
        res.status(200).json("Seat deleted successfully")
    }
    catch(err){
        next(err)
    }
}

export const getSeat= async(req,res,next)=>{
    try{
        const getSeat=await Seat.findById(req.params.id)
        res.status(200).json(getSeat)
    }
    catch(err){
        next(err)
    }
}

export const getSeats= async(req,res,next)=>{
    try{
        const allSeat=await Seat.find()
        res.status(200).json(allSeat)
    }
    catch(err){
        next(err)
    }
}