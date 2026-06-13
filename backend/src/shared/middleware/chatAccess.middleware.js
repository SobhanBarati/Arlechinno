import { findChatById } from "../../modules/chats/chat.repository.js";

export const chatAccessMiddleware = async(req , res , next) => {
    try {
        const chatId = req.params.chatId || req.body.chatId;

        const userId = req.user.userId ;

        const chat = await findChatById(chatId);

        if(!chat){
            return res.status(404).json({
                success: false,
                message: "Chat not found!",
            });
        }

        // important bug (objectId)
        const isParticipant = chat.participants.some(
            p => p._id.toString() === userId
        );

        if(!isParticipant){
            return res.status(403).json({
                success: false,
                message: "Access denied",
            });
        }
        
        req.chat = chat;

        next();

    } catch (error) {
        next(error);
    }
};