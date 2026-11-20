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
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Name, email and password are required' });
        }

        if (role !== 'patient' && role !== 'doctor') {
            return res.status(400).json({ success: false, message: 'Role must be patient or doctor' });
        }

        // Check both collections: login looks up the email in both,
        // so the same email must not exist as patient AND doctor
        const existingUser =
            (await User.findOne({ email })) || (await Doctor.findOne({ email }));

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // "not-specified" (the signup form default) is not a valid enum value
        const validGender = ['male', 'female', 'other'].includes(gender) ? gender : undefined;

        const Model = role === 'patient' ? User : Doctor;
        const user = new Model({
            name,
            email,
            password: hashedPassword,
            photo,
            gender: validGender,
            role
        });

        await user.save();

        res.status(200).json({ success: true, message: 'User successfully created' });

    } catch (err) {
        console.error('Register error:', err);
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
        const { password, role, appointments, ...rest } = user._doc
        res.status(200).json({ success: true, message: 'Successfully login', token, data:{...rest}, role });

    
    } catch (err) {
        res.status(500).json({
            message: "Failed to login"
        });
    }  
};
