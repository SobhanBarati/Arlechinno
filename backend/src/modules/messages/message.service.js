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

export const markMessagesAsSeenService = async (
    chatId,
    userId
) => {

    const result =
        await Message.updateMany(
            {
                chatId,

                senderId: {
                    $ne: userId
                },

                seenBy: {
                    $ne: userId
                }
            },
            {
                $push: {
                    seenBy: userId
                }
            }
        );

    return result.modifiedCount;
};

export const editMessageService = async({
    messageId,
    userId,
    content,
}) => {
    const message = await Message.findById(messageId);

    if(!message){
        throw new Error("Message not found!");
    }

    if(message.senderId.toString() !== userId){
        throw new Error("You can't edit this message.");
    }

    message.content = content ;

    message.isEdited = true ;

    message.editedAt = Date.now();

    await message.save();
    
    return message;
    
};