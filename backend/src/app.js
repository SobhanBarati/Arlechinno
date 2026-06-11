import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes.js";

import { errorMiddleware } from "./shared/middleware/error.middleware.js";

import userRoutes from "./modules/users/user.route.js";

import chatRoutes from "./modules/chats/chat.routes.js";

import messageRoutes from "./modules/messages/message.routes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth" , authRoutes);

app.use("/api/v1/users" , userRoutes);

app.use("/api/v1/chats" , chatRoutes);

app.use("/api/v1/messages" , messageRoutes);

app.use(errorMiddleware);
export default app;