import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import flightsRoute from "./routes/flights.js"
import usersRoute from "./routes/users.js"
import seatsRoute from "./routes/seats.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import bodyParser from "body-parser"
import session from "express-session"
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import flightmodel from "./models/flights.js"
import usersmodel from "./models/users.js"

const app=express()
dotenv.config()

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(cors());

// mongoose connection
const connect = async () => {
    try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongodb")
    } catch (error) {
    throw error; I
    }
};

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

// mongoose.connection.on("disconnected",()=>{
//     console.log("MongoDB Disconnected")
// })


// mongoose.connection.on("connected",()=>{
//     console.log("MongoDB connected")
// })

// Api request and response
app.get("/",(req,res)=>{
  res.sendFile(join(__dirname + "/public/index2.html"));
})

//Middlewares
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/flights", flightsRoute)
app.use("/api/seats", seatsRoute)

//error handling
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  });
 
app.listen(8900, ()=>{
    connect()
    console.log("Connection Established")
})