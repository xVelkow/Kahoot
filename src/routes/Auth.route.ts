import { Router } from "express";
import { login, loginStatus, logout } from "../controllers/Auth.controller";
import { isAuthenticated } from "../middlewares/Authentication.middleware";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.get("/status", isAuthenticated, loginStatus);
authRouter.get("/logout", isAuthenticated, logout);

export default authRouter;