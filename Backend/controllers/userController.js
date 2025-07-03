import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne   
        ({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" }); 
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });
        // Generate JWT token
        const gentoken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: "3d"
        });
        return res.status(201).json({
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            },
            token: gentoken(newUser._id)
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};   
// Login user
export const loginUser = async (req, res) => {  
    try{
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne
        ({ email });
        if (!user) {
            return res.status(500).json({ message: "Invalid email or password" });
        }
        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(500).json({ message: "Invalid email or password" });
        }
        
        // Generate JWT token
        const gentoken = (userId) => jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: "3d" 
        });
        return res.status(200).json({

            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token: gentoken(user._id)
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error"   
        });
    }
};
// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
// Update user profile
// export const updateUserProfile = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         // Update user fields
//         user.name = req.body.name || user.name;
//         user.email = req.body.email || user.email;
//         if (req.body.password) {
//             user.password = await bcrypt.hash(req.body.password, 10);
//         }
//         await user.save();
//         return res.status(200).json({
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email
//             }
//         });
//     } catch (error) {
//         return res.status(500).json({ message: "Server error" });
//     }
// };
// // Delete user account
// export const deleteUserAccount = async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         await user.remove();
//         return res.status(200).json({ message: "User account deleted successfully" });
//     } catch (error) {
//         return res.status(500).json({ message: "Server error" });
//     }
// };
