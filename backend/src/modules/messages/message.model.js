import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    content: {
        type: String,
        default: "",
    },

    messageType: {
        type: String,
        enum: ["text","image","file"],
        default: "text",
    },

    seenBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
},
{ timestamps: true }
);

const Message = mongoose.model ("Message" , messageSchema);

export default Message;