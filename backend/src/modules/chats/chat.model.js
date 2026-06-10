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
        ref: "message",
        default: null,
    },
},
{ timestamps: true }
);

export default mongoose.model("Chat" , chatSchema);