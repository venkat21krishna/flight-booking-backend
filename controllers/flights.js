import flight from "../models/flights.js"

export const createFlight= async(req,res,next)=>{
    // const{ flightname, duration, price, seats, source, destination, arrival, departure }= req.body
    const newFlight= new flight(req.body)

    try{
        const savedFlight= await newFlight.save()
        res.status(200).json(savedFlight)
    }
    catch(err){
        next(err)
    }
}

export const updateFlight= async(req,res,next)=>{
    try{
        const UpdatedFlight = await flight.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true });        
        res.status(200).json(UpdatedFlight)
    }
    catch(err){
        next(err)
    }
}

export const deleteFlight= async(req,res,next)=>{
    try{
        await flight.findByIdAndDelete(req.params.id)
        res.status(200).json("Successfully deleted flight")
    }
    catch(err){
        next(err)
    }
}

export const getFlight= async(req,res,next)=>{
    try{
        const getflights=await flight.findById(req.params.id)
        res.status(200).json(getflights)
    }
    catch(err){
        next(err)
    }
}

export const getFlights= async(req,res,next)=>{
    try{
        const allflight=await flight.find()
        res.status(200).json(allflight)
    }
    catch(err){
        next(err)
    }
}
