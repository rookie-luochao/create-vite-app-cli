import { lazy } from "react";

const Login = lazy(() => import("./index"));

export const loginRoutes = {
  path: "/login",
  id: "登录",
  element: <Login />,
};
