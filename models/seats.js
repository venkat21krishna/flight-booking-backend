import mongoose from 'mongoose';
// const { Schema } = mongoose;

const SeatsSchema = new mongoose.Schema({
    SeatType:{
        type:String
    },
    price:{
        type:Number
    },
    seatavailability:[{number:Number, unavailableDates: {type:[Date]}}],
},
    {timestamps:true}
);

export default mongoose.model("seat", SeatsSchema)