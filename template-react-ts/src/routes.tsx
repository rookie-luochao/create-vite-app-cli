import { Navigate, RouteObject } from "react-router-dom";
import { loginRoutes } from "./login/routes";
import { mainRoutes } from "./mainLayout/routes";
import { ErrorBoundaryWrapOutlet } from "./core/error-boundary";

export function getAppRoutes() {
  return [
    {
      path: "/",
      element: <ErrorBoundaryWrapOutlet />,
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
