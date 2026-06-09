import {
    findById,
    updateUser,
    searchUsers,
} from "./user.repository.js";

import { NotFoundError } from "../../shared/errors/NotFoundError.js";

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