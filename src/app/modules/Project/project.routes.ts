import { Router } from "express";
import { ProjectController } from "./project.controller";

const router = Router();

router.post("/create_project", ProjectController.createProject);
router.patch("/:id", ProjectController.UpdateProject);
router.get("/", ProjectController.getAllProjects);
router.delete("/:id", ProjectController.deleteProject);

export const ProjectRouter = router;
