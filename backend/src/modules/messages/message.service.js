import { createMessage } from "./message.model.js";

export const sendMessageService = async(
    chatId ,
    senderId , 
    content ,
) => {
    const message = await createMessage({
        chatId,
        senderId,
        content,
    });

    return message;
};