import { Router } from "express";
import { login, loginStatus, logout } from "../controllers/Auth.controller";
import { isAuthenticated } from "../middlewares/Authentication.middleware";
import passport from "passport";

const authRouter = Router();

authRouter.post("/login", passport.authenticate('local'), login);
authRouter.get("/status", isAuthenticated, loginStatus);
authRouter.get("/logout", isAuthenticated, logout);

export default authRouter;