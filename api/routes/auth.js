import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

//register and login configured in controllers
// using bcrypt to encrypt password

router.post("/register", register)
router.post("/login", login)

export default router