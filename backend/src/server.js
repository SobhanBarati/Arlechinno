import http from "http";

import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

import { initSocket } from "./socket/socket.js";

import { registerSocketHandlers } from "./socket/socket.handler.js";

dotenv.config();

const PORT = process.env.PORT || 5000 ;

const server = http.createServer(app);

const io = initSocket(server);

registerSocketHandlers(io);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB Connected.");

        server.listen(PORT, () => {
            console.log(`Server running on ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });