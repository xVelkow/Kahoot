import { Request, Response } from 'express';
import passport from 'passport';

import { userSelect } from '../models/User.model';

const login = async (req: Request, res: Response) => {
    passport.authenticate('local', (err: Error | null, user: userSelect, info: { message: string }) => {
        if(err) return res.status(401).json({ message: err.message });
        if(!user) return res.status(401).json({ message: info?.message || "Unauthorized." });
        req.logIn(user, err => {
            if(err) return res.status(401).json({ message: err.message });
            return res.status(200).json({ message: "Logged in successfully." });
        });
    })(req, res);
};

const loginStatus = async (req: Request, res: Response) => {
    try{
        if(req.isAuthenticated()) res.status(200).json({ authenticated: true });
        else throw res.status(200).json({ authenticated: false });
    }catch(err){
        res.status(401).json({ message: err.message });
    }
};

const logout = async (req: Request, res: Response) => {
    try{
        if(!req.user) throw new Error("Unauthorized.");
        req.logout(err => {
            if(err) throw new Error("Logout failed.");
            req.session.destroy(err => {
                if(err) throw new Error("Session failed to destroy.");
                res.clearCookie("connect.sid").status(200).json({ message: "Logged out." });
            })
        });
    }catch(err){
        res.status(401).json({ message: err.message });
    }
};

export { login, loginStatus, logout };