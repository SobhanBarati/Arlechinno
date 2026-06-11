import { asyncHandler } from "../../shared/utils/asyncHandler.js";

import {
    createPrivateChatService ,
    getUserChatsService,
} from './chat.service.js';

export const createPrivateChat = asyncHandler(
    async(req , res) => {
        const { userId } = req.body;

        const chat = await createPrivateChatService(
            req.user.userId,
            userId
        );

        res.status(201).json({
            success: true,
            data: chat,
        });
    }
);

export const getUserChats = asyncHandler(
    async(req , res) => {
        const chats = await getUserChatsService(
            req.user.userId,
        );

        res.json({
            success: true,
            data: chats,
        });
    }
);

