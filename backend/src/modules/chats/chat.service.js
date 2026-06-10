import { 
    createChat,
    findPrivateChat,
    findUserChats,
} from "./chat.model.js";

export const createPrivateChatService = async(
    userId ,
    targetUserId 
) => {
    const existingChat = await findPrivateChat(
        userId,
        targetUserId,
    );

    if(existingChat){
        return existingChat;
    }

    return createChat({
        type: "private",
        participants: [userId , targetUserId],
    });
};

export const getUserChats = async(userId) => {
    return findUserChats(userId);
};

