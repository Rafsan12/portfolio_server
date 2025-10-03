import { Router } from "express";
import { BlogRouter } from "../modules/Blog/blog.route";
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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
