import { Router } from "express";
import userRoutes from "../api/users/route";
import authRoutes from "../api/auth/route";
import categoryRouter from "../api/products/categories/route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRouter);

export default router;
