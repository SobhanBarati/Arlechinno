import { asyncHandler } from "../../shared/utils/asyncHandler.js";

import {
    sendMessageService,
    getMessagesService,
} from "./message.service.js";

export const sendMessage = asyncHandler(
    async(req , res) => {
        const message = await sendMessageService({
            chatId: req.body.chatId,
            content: req.body.content,
            senderId: req.user.userId,
        });

        res.status(201).json({
            success: true,
            data: message,
        });
    }
);

export const getMessages = asyncHandler(
    async(req , res) => {
        const messages = await getMessagesService(req.params.chatId);

        res.json({
            success: true,
            data: messages,
        });
    }
);