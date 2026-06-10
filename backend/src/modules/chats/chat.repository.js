import Chat from './chat.model.js';

export const createChat = async(data) => {
    return Chat.create(data);
};

export const findChatById = async(id) => {
    return Chat.findById(id)
        .populate("participants" , "username avatar")
        .populate("lastMessage");
};

export const findUserChats = async(userId) => {
    return Chat.find({
        participants: userId,
    })
    .populate("participants" , "username avatar")
    .populate("lastMessage");
};

export const findPrivateChat = async(
    userId ,
    targetUserId,
) => {
    return Chat.findOne({
        type: "private",
        participants: {
            $all: [userId , targetUserId],
            $size: 2,
        },
    });
};