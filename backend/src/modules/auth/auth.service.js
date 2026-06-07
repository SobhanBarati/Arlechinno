import bcrypt from 'bcryptjs';
import { createUser , findUserByEmail } from "./auth.repository.js";

export const registerUser = async({ username , email , password }) => {
    const existingUser = await findUserByEmail(email);

    if(existingUser){
        throw new Error("User already exists.");
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    const user = await createUser({
        username,
        email,
        password: hashedPassword,
    });

    return user;
};   