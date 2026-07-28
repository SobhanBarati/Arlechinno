import express from "express";

import {
    sendMessage,
    getMessages,
    editMessage,
} from "./message.controller.js";

import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

import { chatAccessMiddleware } from "../../shared/middleware/chatAccess.middleware.js";

import { editMessageSchema } from "./message.validation.js";
import { validate } from "../../shared/validators/validate.js";

const router = express.Router();

router.post("/" , authMiddleware , chatAccessMiddleware , sendMessage);
router.get("/:chatId" , authMiddleware , chatAccessMiddleware , getMessages);
router.patch("/:id" , authMiddleware , validate(editMessageSchema) , editMessage);

export default router;