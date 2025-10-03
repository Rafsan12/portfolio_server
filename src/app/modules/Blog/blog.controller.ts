import { Request, Response } from "express";
import { BlogService } from "./blog.service";

const createBlog = async (req: Request, res: Response) => {
  try {
    const result = await BlogService.createBlog(req.body);
    res
      .status(201)
      .json({ message: " Blog Created successfully", data: result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
const updateBlog = async (req: Request, res: Response) => {
  try {
    const blogId = Number(req.params.id);

    const result = await BlogService.updateBlog(blogId, req.body);
    res
      .status(201)
      .json({ message: " Blog updated successfully", data: result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
const getAllBlog = async (req: Request, res: Response) => {
  try {
    const result = await BlogService.getAllBlog();
    res
      .status(201)
      .json({ message: "All Blogs fetch successfully", data: result });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
const deleteBlog = async (req: Request, res: Response) => {};

export const BlogController = {
  createBlog,
  updateBlog,
  getAllBlog,
  deleteBlog,
};
