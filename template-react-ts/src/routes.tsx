import { Navigate, RouteObject } from "react-router-dom";
import { loginRoutes } from "./login/routes";
import { mainRoutes } from "./mainLayout/routes";

export function getAppRoutes() {
  return [
    {
      path: "/",
      children: [
        {
          path: "",
          element: <Navigate to="/login" />,
        },
        loginRoutes,
        mainRoutes,
      ],
    },
  ] as RouteObject[];
}
