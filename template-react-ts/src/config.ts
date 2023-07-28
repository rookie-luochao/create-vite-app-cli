import { IConfig } from "./core/http/config";

// 一级path, 例如：gin-demo-server
export const urlPath = "";

// 项目基本变量配置
const appConfig: IConfig = {
  // 应用名称, 例如：webapp
  appName: "",
  // 网络请求的域名，例如：https://srv-gin-demo-server---devops.devops-jiahuayun-dev.rockontrol.com
  baseURL: "",
  // 发布版本，例如：221385b-0.0.1
  version: "",
  // 代码环境，例如：demo
  env: "",
};

export default appConfig;
