import express from "express";
import {
    updateUser,
    deleteUser,
    getAllUser,
    getSingleUser,
    getUserProfile,
    getMyAppointments
} from "../Controllers/userController.js"; // Added .js extension
import { authenticate, restrict } from "../Controllers/auth/verifyToken.js";
const router = express.Router();

// User routes
router.get("/:id", authenticate, restrict(["patient"]), getSingleUser);    // Get single user by ID
router.get("/", authenticate, restrict(["admin"]), getAllUser);          // Get all users
router.put("/:id", authenticate, restrict(["patient"]), updateUser);       // Update user by ID
router.delete("/:id", authenticate, restrict(["patient"]), deleteUser);    // Delete user by ID
router.get("/profile/me", authenticate, restrict(["patient"]), getUserProfile);  
router.get("/appointments/my-appointments", authenticate, restrict(["patient"]), getMyAppointments);  
export default router; 