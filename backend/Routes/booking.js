import express from "express";
import { authenticate, restrict } from "../Controllers/auth/verifyToken.js";
import { getCheckoutSession } from "../Controllers/bookingController.js";

const router = express.Router();

router.post("/checkout-session/:doctorId", authenticate, restrict(["patient"]), getCheckoutSession);

export default router;
