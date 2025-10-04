import { Router } from "express";
import { BlogRouter } from "../modules/Blog/blog.route";
import { ProjectRouter } from "../modules/Project/project.routes";
import { UserRoutes } from "../modules/User/user.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/blog",
    route: BlogRouter,
  },
  {
    path: "/project",
    route: ProjectRouter,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
