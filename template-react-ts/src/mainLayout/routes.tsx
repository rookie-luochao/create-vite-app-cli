import MainLayout from "./index";
import { pagesRoutes } from "../pages/routes";

export const mainRoutes = {
  path: "main",
  element: <MainLayout />,
  children: pagesRoutes,
};
