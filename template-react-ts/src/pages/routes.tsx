import { lazy } from "react";

const Module1 = lazy(() => import("./module1"));
const Module2 = lazy(() => import("./module2"));
const Module3 = lazy(() => import("./module3"));

export const pagesRoutes = [
  {
    path: "module1",
    element: <Module1 />,
  },
  {
    path: "module2/:id",
    element: <Module2 />,
  },
  {
    path: "module3",
    element: <Module3 />,
  },
];
