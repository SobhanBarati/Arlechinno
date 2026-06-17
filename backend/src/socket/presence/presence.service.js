const onlineUsers = new Map();

export const addOnlineUser = (userId , socketId) => {
    onlineUsers.set(userId , socketId);
};

export const removeOnlineUser = (userId) => {
    onlineUsers.delete(userId);
};

export const isUserOnline = (userId) => {
    return onlineUsers.has(userId);
};

export const getOnlineUsers = () => {
    return [...onlineUsers.keys()];
};