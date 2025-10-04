import { Router } from "express";
import { verifySuperAdmin } from "../../middlewares/verifySuperAdmin";
import { ProjectController } from "./project.controller";

const router = Router();

router.get("/", ProjectController.getAllProjects);

router.post(
  "/create_project",
  verifySuperAdmin,
  ProjectController.createProject
);
router.patch("/:id", verifySuperAdmin, ProjectController.UpdateProject);

router.delete("/:id", verifySuperAdmin, ProjectController.deleteProject);

export const ProjectRouter = router;
