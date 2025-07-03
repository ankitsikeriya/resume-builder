import newUser from "../models/userModel.js";
import jwt from "jsonwebtoken";
// Middleware to protect routes
export const protect = async (req, res, next) => {
    let token;
    // Check if token is in headers
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header        
            token = req.headers.authorization.split(" ")[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await newUser.findById(decoded.id);
            next();
        } catch (error) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
