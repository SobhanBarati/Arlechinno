import express from "express";

import {
    sendMessage,
    getMessages,
} from "./message.controller.js";

import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

import { chatAccessMiddleware } from "../../shared/middleware/chatAccess.middleware.js";

const router = express.Router();

router.post("/" , authMiddleware , chatAccessMiddleware , sendMessage);
router.get("/:chatId" , authMiddleware , chatAccessMiddleware , getMessages);

export default router;