import { 
    sendMessageService,
    markMessagesAsSeenService,
    editMessageService,
} from "../modules/messages/message.service.js";

import { 
    addOnlineUser,
    getOnlineUsers,
    removeOnlineUser,
    //getUserSockets
    updateLastSeen
} from "./presence/presence.service.js";

export const registerSocketHandlers = (io) => {
    io.on("connection" , 
        (socket) => {

            const userId = socket.user.userId;

            addOnlineUser(
                userId,
                socket.id
            );

            io.emit(
                "user_online",
                {
                    userId
                }
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

            socket.on(
                "messages_seen",
                async (data) => {
            
                    console.log("EVENT RECEIVED:", data);
            
                    try {
            
                        const modifiedCount =
                            await markMessagesAsSeenService(
                                data.chatId,
                                userId
                            );
            
                        console.log("Modified:", modifiedCount);
            
                        if (modifiedCount > 0) {
            
                            socket.to(data.chatId).emit(
                                "messages_seen",
                                {
                                    chatId: data.chatId,
                                    userId,
                                    modifiedCount
                                }
                            );
            
                        }
            
                    } catch (error) {
            
                        console.error(error);
            
                        socket.emit(
                            "error_message",
                            error.message
                        );
            
                    }
            
                }
            );

            socket.on("edit_message",
                async(data) => {
                    try {
                        const message = await editMessageService({
                            messageId: data.messageId,
                            userId,
                            content: data.content,
                        });

                        io.to(message.chatId.toString()).emit("message_edited", message);

                    } catch (error) {
                        socket.emit("error_message", error.message);
                    }
                }
            );

            socket.on("disconnect" ,
                async () => {

                    const isOffline = removeOnlineUser(
                        userId,
                        socket.id
                    );

                    if(isOffline){
                        await updateLastSeen(
                            userId
                        );

                        io.emit(
                            "user_offline",
                            {
                                userId
                            }
                        );

                        console.log("Last Seen Updated.");
                    }

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