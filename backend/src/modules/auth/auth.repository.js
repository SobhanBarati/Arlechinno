import User from "./auth.model.js";

export const findUserByEmail = async(email) => {
    return await User.findOne({ email });
};

export const findUserByUsername = async(username) => {
    return await User.findOne({ username });
};

export const createUser = async(data) => {
    return await User.create(data);
};