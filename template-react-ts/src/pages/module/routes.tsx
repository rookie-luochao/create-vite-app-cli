import { lazy } from "react";
const Dashboard = lazy(() => import("."));

export const dashboardModuleName = "dashboard";

export const dashboardRoutes = {
  path: dashboardModuleName,
  id: "面板",
  element: <Dashboard />,
};
