import { Router } from "express";
import AuthRouter from "./AuthRoutes.js";
import UserRoutes from "./UserRoutes.js";
const router = Router();

router.use("/api", AuthRouter);
router.use("/api", UserRoutes);

export default router;
