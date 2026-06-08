import express from 'express';
import { 
    register,
    login,
    refreshToken,
    logout
} from "./auth.controller.js";

import { validate } from "../../shared/validators/validate.js";
import {
    registerSchema,
    loginSchema
} from "./auth.validation.js";

import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

const router = express.Router();

router.post("/register" , validate(registerSchema) , register);
router.post("/login" , validate(loginSchema) , login);
router.post("/refresh-token", refreshToken);
router.post("/logout" , authMiddleware , logout);

export default router;