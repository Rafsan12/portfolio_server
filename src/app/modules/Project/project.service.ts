import { Prisma, Project } from "@prisma/client";
import { prisma } from "../../../config/db";

const createProject = async (
  payload: Prisma.ProjectCreateInput
): Promise<Project> => {
  const createProject = await prisma.project.create({
    data: payload,
    include: { owner: { select: { id: true, name: true } } },
  });
  return createProject;
};
const UpdateProject = async (
  id: number,
  payload: Prisma.ProjectCreateInput
): Promise<Project> => {
  const { name, description, tags } = payload;
  const updateProject = await prisma.project.update({
    where: { id },
    data: { name, description, tags },
    include: { owner: { select: { id: true, name: true } } },
  });

  return updateProject;
};
const getAllProjects = async () => {
  const allProjects = await prisma.project.findMany();
  return allProjects;
};
const deleteProject = async (id: number) => {
  await prisma.project.delete({ where: { id } });
};

export const ProjectService = {
  createProject,
  UpdateProject,
  getAllProjects,
  deleteProject,
};
