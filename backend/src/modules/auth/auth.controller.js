import { asyncHandler } from '../../shared/utils/asyncHandler.js';

import { registerUser } from "./auth.service.js";

import { loginUser } from "./auth.service.js";

import { refreshTokenService } from './auth.service.js';

import { logoutService } from './auth.service.js';

export const refreshToken = asyncHandler(
    async(req , res) => {
        const { refreshToken } = req.body;

        const tokens = await refreshTokenService(refreshToken);

        res.status(200).json({
            success: true,
            data: tokens,
        }); 
    }
)

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

export const logout = asyncHandler(
    async(req , res) => {
        await logoutService(req.user.userId);

        res.status(200).json({
            success: true,
            message: "Logged out successfully.",
        });
    }
);