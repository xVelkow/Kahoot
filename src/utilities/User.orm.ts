import { db } from "../models/db";
import { eq, sql } from "drizzle-orm";
import { users } from "../models/User.model";

export const getUsers = async () => {
    try{
        const allUsers = await db.select().from(users);
        return allUsers;
    }catch(err){
        return err.message;
    }
}

export const getUserById = async (id: number) => {
    try{
        const [user] = await db.select().from(users).where(eq(users.userId, id));
        return user;
    }catch(err){
        return err.message;
    }
}

export const getUserByEmail = async (email: string) => {
    try{
        const [user] = await db.select().from(users).where(eq(users.userEmail, email));
        return user;
    }catch(err){
        return err.message;
    }
}

export const isUserLoggedIn = async (id: number) => {
    try{
        const count = Number((await db.execute(sql`SELECT COUNT(*) FROM sessions WHERE sess->'passport'->>'user' = ${id}`)).rows[0].count);
        return !!count;
    }catch(err){
        return err.message;
    }
}

export const deleteUserSession = async (id: number) => {
    try{
        await db.execute(sql`DELETE FROM sessions WHERE sess->'passport'->>'user' = ${id}`);
        return true;
    }catch(err){
        return false;
    }
}