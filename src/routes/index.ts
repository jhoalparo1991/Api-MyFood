import { Router } from "express";
import userRoutes from "../api/users/route";
import authRoutes from "../api/auth/route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;
