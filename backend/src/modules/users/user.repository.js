import User from "./user.model.js";

export const findUserByEmail = async(email) => {
    return await User.findOne({ email }).select("+password");
};

export const findUserById = async(id) => {
    return await User.findById(id);
};

export const createUser = async(data) => {
    return await User.create(data);
};

export const findById = async(id) => {
    return User.findById(id).select("-password");
};

export const updateUser = async(id , data) => {
    return User.findByIdAndUpdate(id , data , {
        new: true,
    }).select("-password");
};

export const searchUsers = async(query) => {
    return User.find({
        username: {
            $regex: query,
            $options: "i",
        },
    }).select("-password");
};

