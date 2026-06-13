import { sendMessageService } from "../modules/messages/message.service.js";

export const registerSocketHandlers = (io) => {
    io.on("connection" , 
        (socket) => {
            console.log(
                "User connected: ",
                socket.id
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


            socket.on("disconnect" ,
                () => {
                    console.log(
                        "User disconnected: " ,
                        socket.id
                    );
                }
            );
        }
    );
};