export const loginRoutes = {
  path: "/login",
  name: "Login",
  component: () => import("./index.vue"),
  meta: {
    title: "登录页",
  },
};
