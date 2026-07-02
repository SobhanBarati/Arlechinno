import { 
    sendMessageService,
    markMessagesAsSeenService,
} from "../modules/messages/message.service.js";

import { 
    addOnlineUser,
    getOnlineUsers,
    removeOnlineUser,
    //getUserSockets
} from "./presence/presence.service.js";

export const registerSocketHandlers = (io) => {
    io.on("connection" , 
        (socket) => {

            const userId = socket.user.userId;

            addOnlineUser(
                userId,
                socket.id
            );

            console.log(
                "User connected: ",
                socket.id
            );

            console.log(
                "Online user: ",
                userId
            );

            console.log(
                "ONLINE USERS: ",
                getOnlineUsers()
            );

            socket.on("join_chat" ,
                (chatId) => {
                    socket.join(chatId);

                    console.log(
                        `${socket.id} joined ${chatId}`
                    );
                }
            );

            socket.on(
                "send_message",
                async (data) => {
                
                    try {
                    
                        console.log("MESSAGE RECEIVED:", data);
                    
                        const message =
                            await sendMessageService({
                              chatId: data.chatId,
                              content: data.content,
                              senderId:
                                socket.user.userId,
                            });
                    
                        console.log("MESSAGE SAVED:", message);
                    
                        io.to(data.chatId).emit(
                            "receive_message",
                            message
                        );
                    
                        console.log(
                            "MESSAGE EMITTED TO:",
                            data.chatId
                        );
                    
                    } catch (error) {

                        console.error(error);
                                
                        socket.emit(
                            "error_message",
                            error.message
                        );
                    }
                }
            );

            socket.on("typing_start",
                (data) => {
                    socket.to(data.chatId).emit(
                        "user_typing",
                        {
                            userId
                        }
                    );
                }
            );

            socket.on("typing_stop", 
                (data) => {
                    socket.to(data.chatId).emit(
                        "user_stop_typing",
                        {
                            userId
                        }
                    );
                }
            );

            socket.on("message_seen",
                async(data) => {
                    try {
                        const modifiedCount = await markMessagesAsSeenService(
                            data.chatId,
                            userId
                        );

                        if(modifiedCount > 0){
                            socket.to(data.chatId).emit(
                                "message_seen" ,
                                {
                                    chatId: data.chatId,
                                    userId,
                                    modifiedCount,
                                }
                            );
                        }
                    } catch (error) {
                        socket.emit(
                            "error_message",
                            error.message
                        )
                    }
                }
            );

            socket.on("disconnect" ,
                () => {

                    const isOffline = removeOnlineUser(
                        userId,
                        socket.id
                    );

                    /*console.log(
                        "USER SOCKETS:",
                        getUserSockets(userId)
                    );*/
                    
                    if(isOffline){
                        console.log(
                            "Offline User: ",
                            userId
                        );
                    }

                    console.log(
                        "ONLINE USERS: ",
                        getOnlineUsers()
                    );

                    console.log(
                        "User disconnected: " ,
                        socket.id
                    );
                }
            );
        }
    );
};