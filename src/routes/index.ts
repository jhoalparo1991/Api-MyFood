import { Router } from "express";
import userRoutes from "../api/users/route";
import authRoutes from "../api/auth/route";
import categoryRouter from "../api/products/categories/route";
import enterpriseRouter from "../api/enterprises/enterprise/route";
import salePointRouter from "../api/enterprises/sale_point/route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRouter);
router.use("/enterprise", enterpriseRouter);
router.use("/sale-point", salePointRouter);

export default router;
