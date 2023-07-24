import { lazy } from "react";

const Login = lazy(() => import("./index"));

export const loginRoutes = {
  path: "login",
  element: <Login />,
};
