import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import bcrypt from "bcryptjs";

import { getUserByEmail, getUserById } from "../utilities/User.orm";
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
            if(!email || !password){
                return done(null, false);
            }

            const user = await getUserByEmail(email);
            if(!user){
                return done(null, false);
            }

            if(!await bcrypt.compare(password, user.userPassword)){
                return done(null, false);
            }

            return done(null, user);

        }catch(err){
            return done(err);
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