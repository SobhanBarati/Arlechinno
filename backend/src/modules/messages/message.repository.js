import Message from './message.model.js';

export const createMessage = async(data) => {
    return Message.create(data);
};

export const findMessageByChat = async(chatId) => {
    return Message.find({ chatId })
        .populate("senderId" , "username avatar")
        .sort({ createdAt: 1 });
};