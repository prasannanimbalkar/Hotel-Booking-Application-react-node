import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser";


import authRoute from "./routes/auth.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import usersRoute from "./routes/users.js"


const app = express()

// a lightweight npm package that automatically loads environment variables from a . env file into the process. env object.
dotenv.config()

// connecting mongodb using mongoose
const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB")
    } catch (error) {
        throw error;
    }
}

// express takes req and res parameters and use it inside any api request
// user makes req and res sent by us

// app.get('/', (req, res) => {
//     res.send("this is first request")
// })


mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
})

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected")
})


// middleware 

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)
app.use("/api/users", usersRoute)


//error handling middleware
app.use((err,req,res,next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(8800, () => {
    connect()
    console.log("Connected to backend!")
})