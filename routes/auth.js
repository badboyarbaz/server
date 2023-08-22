import express from "express";
import { register, login } from "../controllers/auth.js";
const router = express.Router();

router.post("/register", register);
// login route 
router.post("/login", login);


export default router;
