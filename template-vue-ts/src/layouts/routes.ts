import { RouteRecordRaw } from "vue-router";
import MainLayout from "./MainLayout.vue";
import { viewsRoutes } from "../views/routes";

export const mainRoutes: RouteRecordRaw = {
  path: "/main",
  name: "Main",
  component: MainLayout,
  children: viewsRoutes,
};
