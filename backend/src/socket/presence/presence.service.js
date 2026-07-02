import User from "../../modules/users/user.model.js";

const onlineUsers = new Map();

export const addOnlineUser = (userId , socketId) => {

    if(!onlineUsers.has(userId)){
        onlineUsers.set(
            userId,
            new Set()
        );
    }

    onlineUsers
        .get(userId)
        .add(socketId);

    //onlineUsers.set(userId , socketId);
};

export const removeOnlineUser = (userId , socketId) => {

    if(!onlineUsers.has(userId)){
        return false;
    }

    const sockets = onlineUsers.get(userId);

    sockets.delete(socketId);

    if(sockets.size === 0){
        onlineUsers.delete(userId);

        return true;
    }

    return false;
    //onlineUsers.delete(userId);
};

export const isUserOnline = (userId) => {
    return onlineUsers.has(userId);
};

export const getOnlineUsers = () => {
    return [...onlineUsers.keys()];
};

export const getUserSockets = (userId) => {
    return onlineUsers.get(userId);
};

export const updateLastSeen = async(userId) => {
    await User.findByIdAndUpdate(
        userId ,
        {
            lastSeen: new Date()
        }
    );
};