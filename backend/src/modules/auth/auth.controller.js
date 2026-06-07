import { registerUser } from "./auth.service.js";

export const register = async(req , res) => {
    try {
        const user = await registerUser(req.body);

        res.status(200).json({
           success: true,
           message: "User registered successfully.",
           data: user,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};