import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        password:{
            type: String,
            required: true,
            select: false,    
        },

        avatar:{
            type: String,
            default: "",
        },

        bio:{
            type: String,
            default: "",
        },

        isOnline:{
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
            default: null,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);