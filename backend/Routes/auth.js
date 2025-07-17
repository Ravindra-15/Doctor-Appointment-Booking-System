import express from "express";
import { register, login } from "../Controllers/authController.js";

const router = express.Router();

// Authentication routes
router.post("/register", register); // User registration endpoint
router.post("/login", login);      // User login endpoint

export default router;