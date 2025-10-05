import { Router } from "express";
import { verifySuperAdmin } from "../../middlewares/verifySuperAdmin";
import { BlogController } from "./blog.controller";

const router = Router();

router.post("/create_blog", verifySuperAdmin, BlogController.createBlog);
router.patch("/:id", verifySuperAdmin, BlogController.updateBlog);
router.get("/", BlogController.getAllBlog);
router.get("/:id", BlogController.getSingleBlog);
router.delete("/:id", verifySuperAdmin, BlogController.deleteBlog);

export const BlogRouter = router;
