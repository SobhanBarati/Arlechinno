import express from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

import {
    createPrivateChat,
    getUserChats,
} from './chat.controller.js';


const router = express.Router();

router.post("/" , authMiddleware , createPrivateChat);
router.get("/" , authMiddleware , getUserChats);

export default router;  