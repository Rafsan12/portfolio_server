import { Blog, Prisma } from "@prisma/client";
import { prisma } from "../../../config/db";

const createBlog = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
  const result = await prisma.blog.create({
    data: payload,
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return result;
};
const updateBlog = async (
  id: number,
  payload: Prisma.BlogCreateInput
): Promise<Blog> => {
  const { title, content, thumbnail, tags } = payload;
  const result = await prisma.blog.update({
    where: { id },
    data: { title, content, thumbnail, tags },
    include: { author: { select: { id: true, name: true } } },
  });
  return result;
};
const getAllBlog = async () => {};
const deleteBlog = async () => {};

export const BlogService = {
  createBlog,
  updateBlog,
  getAllBlog,
  deleteBlog,
};
