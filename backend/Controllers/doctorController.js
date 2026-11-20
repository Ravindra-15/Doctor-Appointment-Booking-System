import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import { prepareUpdate } from "./utils/prepareUpdate.js";


export const updateDoctor = async (req, res) => {
    const id = req.params.id;

    if (req.userId !== id) {
        return res.status(403).json({ success: false, message: "You can only update your own account" });
    }

    try {
        const update = await prepareUpdate(req.body);
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedDoctor
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update"
        });
    }
};




export const deleteDoctor = async (req, res) => {
    const id = req.params.id;

    if (req.userId !== id) {
        return res.status(403).json({ success: false, message: "You can only delete your own account" });
    }

    try {
        await Doctor.findByIdAndDelete(
            id,
        );

        res.status(200).json({
            success: true,
            message: "Successfully deleted",

        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete"
        });
    }
};

export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const doctor = await Doctor.findById(id).populate("reviews").select("-password");

        if (!doctor) {
            return res.status(404).json({ success: false, message: "No Doctor found" });
        }

        res.status(200).json({
            success: true,
            message: "Doctor found",
            data: doctor
        });
    } catch (err) {

        res.status(404).json({
            success: false,
            message: "No Doctor found"

        });
    }
};

export const getAllDoctor = async (req, res) => {

    try {
        const { query } = req.query;
        let doctors;

        if (query) {
            doctors = await Doctor.find({
                isApproved: "approved",
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } },
                ],
            }).select("-password");
        } else {
            doctors = await Doctor.find({ isApproved: "approved" }).select("-password");
        }

        res.status(200).json({
            success: true,
            message: "Doctors found",
            data: doctors
        });
    } catch (err) {
        console.error("getAllDoctor error:", err.message);
        res.status(500).json({
            success: false,
            message: "Could not load doctors (database error)"
        });
    }
};

export const getDoctorProfile = async (req, res) => {
    const doctorId = req.userId;

    try {
        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        const { password, ...rest } = doctor._doc;
        const appointments = await Booking.find({ doctor: doctorId });

        res.status(200).json({
            success: true,
            message: "Profile info is getting",
            data: { ...rest, appointments },
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, cannot get"
        });
    }
};
