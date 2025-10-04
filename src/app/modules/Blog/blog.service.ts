import { Blog, Prisma } from "@prisma/client";
import { prisma } from "../../../config/db";

const createBlog = async (payload: Prisma.BlogCreateInput): Promise<Blog> => {
  const createBlog = await prisma.blog.create({
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
  return createBlog;
};
const updateBlog = async (
  id: number,
  payload: Prisma.BlogCreateInput
): Promise<Blog> => {
  const { title, content, thumbnail, tags } = payload;
  const updateBlog = await prisma.blog.update({
    where: { id },
    data: { title, content, thumbnail, tags },
    include: { author: { select: { id: true, name: true } } },
  });
  return updateBlog;
};
const getAllBlog = async () => {
  const allBlogs = await prisma.blog.findMany({});
  return allBlogs;
};
const deleteBlog = async (id: number) => {
  const deleteBlog = await prisma.blog.delete({ where: { id } });
};

export const BlogService = {
  createBlog,
  updateBlog,
  getAllBlog,
  deleteBlog,
};
