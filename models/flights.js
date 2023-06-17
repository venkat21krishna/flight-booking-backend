import mongoose from 'mongoose';
// const { Schema } = mongoose;

const FlightSchema = new mongoose.Schema({
    flightname:{
        type:String,
        required:true 
    },
    flightprice:{
        type:Number,
    },
    seats:{
        type: [String],
    },
    duration:{
        type:Number,
    },
    // luggage:{
    //     type: Number,
    // },
    // psluggage:{
    //     type: Number,
    // },
    source:{
        type:String
    },
    destination:{
        type:String
    },
    arrival:{
        type:String
    },
    departure:{
        type:String
    },
});

export default mongoose.model("flights", FlightSchema)