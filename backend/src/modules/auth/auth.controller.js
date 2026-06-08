import { registerUser } from "./auth.service.js";

import { loginUser } from "./auth.service.js";

import { asyncHandler } from '../../shared/utils/asyncHandler.js';

export const register = asyncHandler(
    async(req , res) => {
        const user = await registerUser(req.body);

        res.status(201).json({
            success: true,
            data: user,
        });
    }
);

export const login = asyncHandler(
    async(req , res) => {
        const user = await loginUser(req.body);

        res.status(200).json({
            success: true,
            data: user,
        });
    }
);