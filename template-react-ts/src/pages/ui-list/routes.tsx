import { UIOne } from "./UIOne";

export const uiListModuleName = "ui-list";
export const uiListModuleNameDefaultPath = "icon";

export const uiListRoutes = {
  path: uiListModuleName,
  id: "UI组件",
  children: [
    {
      path: uiListModuleNameDefaultPath,
      id: "图标",
      element: <UIOne />,
    },
  ],
};
