import express from "express";
import {
    updateDoctor,
    deleteDoctor,
    getAllDoctor,
    getSingleDoctor,
    getDoctorProfile,
} from "../Controllers/doctorController.js"; // Added .js extension
import { authenticate, restrict } from "../Controllers/auth/verifyToken.js";

import reviewRouter from './review.js'
const router = express.Router();

router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);
//nested route
router.use("/:doctorId/reviews", reviewRouter)
// Doctor routes
router.get("/", getAllDoctor);          // Get all Doctors
router.get("/:id", getSingleDoctor);    // Get single Doctor by ID

router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);       // Update Doctor by ID
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);    // Delete Doctor by ID


export default router;