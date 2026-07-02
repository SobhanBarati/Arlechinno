import {
    findById,
    updateUser,
    searchUsers,
} from "./user.repository.js";

import { NotFoundError } from "../../shared/errors/NotFoundError.js";

import User from "./user.model.js";
import { isUserOnline } from "../../socket/presence/presence.service.js";

export const getMyProfileService = async(userId) => {
    const user = await findById(userId);

    if(!user){
        throw new NotFoundError("User not found!");
    }

    return user;
};

export const updateProfileService = async(userId , data) => {
    const updatedUser = await updateUser(userId , data);

    if(!updatedUser){
        throw new NotFoundError("User not found!");
    }

    return updatedUser;
};

export const searchUsersService = async(query) => {
    return await searchUsers(query);
};

export const getUserPresenceService = async(userId) => {
    const user = await User.findById(userId).select("lastSeen");

    if(!user){
        throw new Error("User not found!");
    }

    return{
        isOnline: isUserOnline(userId),
        lastSeen: user.lastSeen,
    };
};