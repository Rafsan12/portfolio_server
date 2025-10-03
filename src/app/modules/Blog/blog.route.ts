import { Router } from "express";
import { BlogController } from "./blog.controller";

const router = Router();

router.post("/create_blog", BlogController.createBlog);
router.patch("/:id", BlogController.updateBlog);
router.get("/", BlogController.getAllBlog);

export const BlogRouter = router;
