import { RequestDemo } from "./RequestDemo";
import { RouterQueryDemo } from "./RouterQueryDemo";

export const utilListModuleName = "util-list";
export const utilListRoutes = {
  path: utilListModuleName,
  id: "工具",
  children: [
    {
      path: "request",
      id: "请求示例",
      element: <RequestDemo />,
    },
    {
      path: "router-toolkit",
      id: "路由工具箱",
      element: <RouterQueryDemo />,
    },
  ],
};
