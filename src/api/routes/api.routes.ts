import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import agentsRouter from './agents.routes'

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/agents", agentsRouter);

export default router;
