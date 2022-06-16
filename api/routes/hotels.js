import express from "express"
import Hotel from "../models/Hotel.js"
import {
    createHotel,
    deleteHotel,
    getHotel,
    getHotels,
    updateHotel,
  } from "../controllers/hotel.js";
  import {verifyAdmin} from "../utils/verifyTaken.js"




const router = express.Router();


//CRUD

//CREATE
// we use async as we are trying to connect to db, try to create document and try to create colection which taks time


// router.post("/", async (req, res) => {
//     const newHotel = new Hotel(req.body) 
//     try {
//         const savedHotel = await newHotel.save()
//         res.status(200).json(savedHotel)
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

router.post("/", verifyAdmin, createHotel);



// //UPDATE
// router.put("/:id", async (req, res) => {
//     try {
//         const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
//         res.status(200).json(updatedHotel)
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

router.put("/:id", verifyAdmin, updateHotel);


// //DELETE
// router.delete("/:id", async (req, res) => {
//     try {
//         await Hotel.findByIdAndDelete(req.params.id)
//         res.status(200).json("Hotel has been deleted")
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

router.delete("/:id", verifyAdmin, deleteHotel);


// //GET
// router.get("/:id", async (req, res) => {
//     try {
//         const hotel = await Hotel.findById(req.params.id)
//         res.status(200).json(hotel)
//     }catch(err){
//         res.status(500).json(err)
//     }
// })

router.get("/find/:id", getHotel);


// //GET ALL
// router.get("/", async (req, res,next) => {
//     try {
//         const hotel = await Hotel.find()
//         res.status(200).json(hotel)
//     }catch(err){
//         next(err)
//     }
// })

router.get("/", getHotels)


// router.get("/", getHotels);
// router.get("/countByCity", countByCity);
// router.get("/countByType", countByType);
// router.get("/room/:id", getHotelRooms);


export default router