import { NextFunction, Request, Response } from "express";
import { BlogService } from "./blog.service";

const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BlogService.createBlog(req.body);
    res
      .status(201)
      .json({ message: " Blog Created successfully", data: result });
  } catch (error: any) {
    // res.status(400).json({ error: error.message });
    next(error);
  }
};
const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blogId = Number(req.params.id);

    const result = await BlogService.updateBlog(blogId, req.body);
    res
      .status(201)
      .json({ message: " Blog updated successfully", data: result });
  } catch (error: any) {
    // res.status(400).json({ error: error.message });
    next(error);
  }
};
const getAllBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BlogService.getAllBlog();
    res
      .status(201)
      .json({ message: "All Blogs fetch successfully", data: result });
  } catch (error: any) {
    // res.status(400).json({ error: error.message });
    next(error);
  }
};
const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BlogService.deleteBlog(Number(req.params.id));

    res.status(201).json({ message: "Blog Deleted successfully", data: null });
  } catch (error: any) {
    // res.status(400).json({ error: error.message });
    next(error);
  }
};

export const BlogController = {
  createBlog,
  updateBlog,
  getAllBlog,
  deleteBlog,
};
