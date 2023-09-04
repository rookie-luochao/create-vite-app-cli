import { RequestDemo } from "./RequestDemo";

export const utilListModuleName = "util-list";
export const utilListModuleNameDefaultPath = "request";

export const utilListRoutes = {
  path: utilListModuleName,
  id: "工具",
  children: [
    {
      path: utilListModuleNameDefaultPath,
      id: "请求示例",
      element: <RequestDemo />,
    },
  ],
};
