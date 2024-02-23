import { Router } from "express";
import PostController from "../controller/PostController.js";
import AuthMiddleware from "../../auth_micro/middleware/AuthMiddleware.js";

const router = Router();

router.post("/post", AuthMiddleware, PostController.createPost);
router.get("/post", PostController.getPost);

export default router;
