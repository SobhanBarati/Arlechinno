import Message from "./message.model.js";
import Chat from "../chats/chat.model.js";

import { createMessage } from "./message.repository.js";

import {
    findMessageByChat,
} from "./message.repository.js";

export const sendMessageService = async({
    chatId ,
    senderId , 
    content ,
}) => {
    const message = await createMessage({
        chatId,
        senderId,
        content,
    });

    await Chat.findByIdAndUpdate(
        chatId,
        {
            lastMessage: message._id,
        }
    );

    return message;
};

export const getMessagesService = async(chatId) => {
    return findMessageByChat(chatId);
};