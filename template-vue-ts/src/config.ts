export interface IConfig {
  appName: string;
  baseURL: string;
  version?: string;
  env?: string;
}

// 一级path, 例如：openapi
export const urlPath = "openapi";

// 项目基本变量配置
const appConfig: IConfig = {
  // 应用名称, 例如：webapp-react
  appName: "webapp-vue",
  // 网络请求的域名，例如：https://host
  baseURL: "https://srv-demo-docker.onrender.com",
  // 发布版本，例如：0000000-0.0.1
  version: "",
  // 代码环境，例如：demo
  env: "demo",
};

export default appConfig;
