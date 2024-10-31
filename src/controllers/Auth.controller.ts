import { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
    try{
        if(!req.user) throw new Error("Wrong credentials.");
        res.status(200).json({ message: "Logged in successfully." });
    }catch(err){
        res.status(401).json({ message: err.message });
    }
};

const loginStatus = async (req: Request, res: Response) => {
    try{
        if(!req.user) throw new Error("Unauthorized.");
        res.status(200).json({
            session: req.session,
            sessionID: req.sessionID,
            message: "Logged in.",
            user: req.user
        });
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