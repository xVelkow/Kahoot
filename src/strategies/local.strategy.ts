import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import bcrypt from "bcryptjs";

import { deleteUserSession, getUserByEmail, getUserById, isUserLoggedIn } from "../utilities/User.orm";
import { userSelect } from "../models/User.model";


declare global {
    namespace Express {
        interface User extends userSelect{}
    }
}

export default passport.use(new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
        try{
            
            if(!email || !password) throw new Error("Email and password are required.");

            const user = await getUserByEmail(email);
            if(!user) throw new Error("Incorrect credentials.");

            if(await isUserLoggedIn(user.userId)){
                const isUserDeleted = await deleteUserSession(user.userId);
                if(!isUserDeleted) throw new Error("User session failed to delete.");
            }

            if(!await bcrypt.compare(password, user.userPassword)) throw new Error("Incorrect credentials.");

            return done(null, user);

        }catch(err){
            return done(err, false);
        }
    }
));

passport.serializeUser((user: userSelect, done) => {
    done(null, user.userId);
});

passport.deserializeUser(async (id: number, done) => {
    const user = await getUserById(id);
    done(null, user);
});