import { RouteRecordRaw } from "vue-router";

export const viewsRoutes: RouteRecordRaw[] = [
  {
    path: "dashboard",
    name: "Dashboard",
    component: () => import("./dashboard/index.vue"),
    meta: {
      title: "主页",
      svgIcon: "dashboard",
      affix: true,
    },
  },
  {
    path: "ui-list",
    name: "UIList",
    children: [
      {
        path: "ui-one",
        name: "UIOne",
        component: () => import("./ui-list/UIOne.vue"),
      },
      {
        path: "ui-two",
        name: "UITwo",
        component: () => import("./ui-list/UITwo.vue"),
      },
    ],
  },
];
