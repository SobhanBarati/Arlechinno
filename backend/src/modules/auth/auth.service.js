import bcrypt from 'bcryptjs';

import { findUserByEmail, findUserById } from "../users/user.repository.js";

import {
    generateAccessToken , 
    generateRefreshToken
} from "../../shared/utils/jwt.js";

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

    return {
        user,
        accesssToken,
        refreshToken
    };
};