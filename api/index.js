import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"


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
app.get('/', (req, res) => {
    res.send("this is first request")
})

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
})

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected")
})

app.listen(8800, () => {
    connect()
    console.log("Connected to backend!")
})