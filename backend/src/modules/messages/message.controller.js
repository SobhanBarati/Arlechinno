import { asyncHandler } from "../../shared/utils/asyncHandler.js";

import {
    sendMessageService,
    getMessagesService,
    editMessageService,
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

export const editMessage = asyncHandler(
    async(req , res , next) => {
        try {
            const message = await editMessageService({
                messageId: req.params.id,
                userId: req.user.userId,
                content: req.body.content,
            });
    
            res.status(200).json({
                success: true,
                message: "Message edited successfully.",
                data: message,
            });

        } catch (error) {
            next(error);
        }
    }
);