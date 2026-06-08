import bcrypt from 'bcryptjs';

import { findUserByEmail, findUserById } from "../users/user.repository.js";

import {
    generateAccessToken , 
    generateRefreshToken
} from "../../shared/utils/jwt.js";

export const refreshTokenService = async(oldRefreshToken) => {
    if(!oldRefreshToken){
        throw new Error("No refresh token.");
    }

    const decoded = jwt.verify(
        oldRefreshToken,
        process.env.JWT_REFRESH_SECRET
    );

    const user = await findUserById(decoded.userId);

    if(!user){
        throw new Error("User not found.");
    }

    if(user.refreshToken !== oldRefreshToken){
        throw new Error("Invalid refresh token.");
    }

    const payload = {
        userId: user._id,
    };

    const newAccessToken = generateAccessToken(payload);

    const newRefreshToken = generateRefreshToken(payload);

    user.refreshToken = newRefreshToken;
    await user.save();

    return {
        accesssToken: newAccessToken,
        refreshToken: newRefreshToken,
    };
};

export const registerUser = async({ username , email , password }) => {
    const existingUser = await findUserByEmail(email);

    if(existingUser){
        throw new ConflictError("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    const user = await createUser({
        username,
        email,
        password: hashedPassword,
    });

    return user;
};   

export const loginUser = async({ email , password }) => {
    const user = await findUserByEmail(email);

    if(!user){
        throw new UnauthorizedError("Invalid credentials.");
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if(!isMatch){
        throw new UnauthorizedError("Invalid credentials.");
    }

    const payload = {
        userId: user._id,
    };

    const accesssToken = generateAccessToken(payload);

    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    return {
        user,
        accesssToken,
        refreshToken
    };
};

export const logoutService = async(userId) => {
    const user = await findUserById(userId);

    if(!user){
        throw new Error("User not found!");
    }

    refreshToken = null;
    user.save();

    return true;
};