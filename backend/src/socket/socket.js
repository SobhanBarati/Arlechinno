import { Server } from "socket.io";

import { socketAuthMiddleware } from "./socket.middleware.js";

let io;

export const initSocket = (server) => {

    io = new Server(server,{
        cors:{
          origin:"*"
        }
    });

    io.use(
        socketAuthMiddleware
    );

    return io;
};

export const getIO = () => {
    if(!io){
        throw new Error(
            "Socket.io not initialized!"
        );
    }

    return io;
};