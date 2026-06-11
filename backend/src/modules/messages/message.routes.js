import express from "express";

import {
    sendMessage,
    getMessages,
} from "./message.controller.js";

import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

const router = express.Router();

router.post("/" , authMiddleware , sendMessage);
router.get("/:chatId" , authMiddleware , getMessages);

export default router;