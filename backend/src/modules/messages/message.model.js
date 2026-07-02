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

    deliveredTo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        } 
    ],

    seenBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    
    isEdited: {
        type: Boolean,
        default: false,
    },

    isDeleted: {
        type: Boolean,
        default: false,
    },
},
{ timestamps: true }
);

const Message = mongoose.model ("Message" , messageSchema);

export default Message;