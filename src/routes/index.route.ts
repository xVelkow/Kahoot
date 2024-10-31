import { Router } from "express";
import userRouter from "./User.route";
import authRouter from "./Auth.route";

const router = Router();

router.use("/user", userRouter);
router.use("/auth", authRouter);

export default router;