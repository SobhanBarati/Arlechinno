import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["private","group"],
        default: "private",
    },

    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: null,
    },
},
{ timestamps: true }
);

const Chat =  mongoose.model("Chat" , chatSchema);

export default Chat;