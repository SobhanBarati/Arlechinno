import { createChat } from "./chat.model.js";

export const createPrivateChatService = async(
    userId ,
    targetUserId 
) => {
    const chat = await createChat({
        type: "private",
        participants: [userId , targetUserId],
    });

    return chat;
};