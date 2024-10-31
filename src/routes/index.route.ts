import { Router } from "express";
import userRouter from "./User.route";

const router = Router();

router.use("/user", userRouter);

export default router;