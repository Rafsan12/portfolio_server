import { NextFunction, Request, Response } from "express";
import { ProjectService } from "./project.service";

const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createProject = await ProjectService.createProject(req.body);
    res
      .status(201)
      .json({ message: "Project Created  successfully", data: createProject });
  } catch (error) {
    next(error);
  }
};
const UpdateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectId = Number(req.params.id);
    const projectBody = req.body;
    const updateProject = await ProjectService.UpdateProject(
      projectId,
      projectBody
    );

    res
      .status(201)
      .json({ message: "Project Updated successfully", data: updateProject });
  } catch (error) {
    next(error);
  }
};
const getAllProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allProjects = await ProjectService.getAllProjects();
    res
      .status(201)
      .json({ message: "All Project fetch successfully", data: allProjects });
  } catch (error) {
    next(error);
  }
};
const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const projectId = Number(req.params.id);
    await ProjectService.deleteProject(projectId);
    res
      .status(201)
      .json({ message: "Project Deleted successfully", data: null });
  } catch (error) {
    next(error);
  }
};

export const ProjectController = {
  createProject,
  UpdateProject,
  getAllProjects,
  deleteProject,
};
