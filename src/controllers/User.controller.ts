import { Request, Response } from "express";
import { isEmail } from "validator";
import { getUserByEmail } from "../utilities/User.orm";

import { db } from "../models/db";
import { users } from "../models/User.model";

import bcrypt from "bcryptjs";

const registerUser = async (req: Request, res: Response) => {
    try{
        const { email, password } = req.body;
        
        if(!email || !password){
            throw new Error("Email and password are required.");
        }

        if(!isEmail(email)){
            throw new Error("Invalid email address.");
        }
        if(await getUserByEmail(email)){
            throw new Error("User already exists.");
        }

        if(password.length < 8){
            throw new Error("Password must be at least 8 characters long.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await db.insert(users).values({ userEmail: email, userPassword: hashedPassword });
        res.status(201).json({message: "User registered successfully"});

    }catch(err){
        res.status(400).json({message: err.message});
    }
}

export { registerUser };