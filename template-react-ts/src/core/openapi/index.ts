import { generateService } from "@umijs/openapi";
import appConfig, { urlPath } from "../../config.ts";

generateService({
  // 实际schemaPath从环境变量读取
  schemaPath: `${appConfig.baseURL}/${urlPath}`,
  serversPath: "./src",
  requestImportStatement: `/// <reference types="./typings.d.ts" />\nimport request from "@request"`,
  namespace: "CloudNativeApi",
});
