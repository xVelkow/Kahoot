import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    try{
        if(req.isUnauthenticated()) throw new Error("Unauthorized.");
        next();
    }catch(err){
        res.status(401).json({ message: err.message });
    }
}