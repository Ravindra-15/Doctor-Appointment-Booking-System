import User from '../models/UserSchema.js'; // For users (patients, admins)
import Doctor from '../models/DoctorSchema.js'; // For doctors

import jwt from 'jsonwebtoken';  
import bcrypt from 'bcryptjs';

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET_KEY,
        // { expiresIn: '15d' } // Token expires in 15 days
    );
}; 

export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;

    try {
        let user = null;

        if (role === 'patient') { // Changed = to ===
            user = await User.findOne({ email });
        } else if (role === 'doctor') { // Changed = to ===
            user = await Doctor.findOne({ email });
        }

        // Check if user exists
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (role === 'patient') { // Changed = to ===
            user = new User({
                name,
                email,
                password: hashedPassword,
                photo,
                gender,
                role
            });
        } else if (role === 'doctor') { // Changed = to ===
            user = new Doctor({
                name,
                email,
                password: hashedPassword,
                photo,
                gender,
                role
            });
        }

        await user.save();

        res.status(200).json({ success: true, message: 'User successfully created' });

    } catch (err) {
        res.status(500).json({ success: false, message: 'Internal server error. Try again' });
    }
};

export const login = async (req, res) => {
    const { email } = req.body;

    try {
        let user = null;
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });
    
        if (patient) {
            user = patient;
        }
        if (doctor) {
            user = doctor;
        }
    
        // check if user exists or not
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
    
        // compare password
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // get token 

        const token = generateToken(user);
        const {password, role, appointmens, ...rest} = user._doc
        res.status(200).json({ success: true, message: 'Successfully login', token, data:{...rest}, role });

    
    } catch (err) {
        res.status(500).json({
            message: "Failed to login"
        });
    }  
};
