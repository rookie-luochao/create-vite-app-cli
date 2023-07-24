import appConfig from "../../config";

export interface IConfig {
  appName: string;
  baseURL: string;
  version?: string;
  env?: string;
}

export function getConfig(): IConfig {
  const defaultAppConfig = {
    appName: "",
    version: "",
    env: "",
    baseURL: "",
  };
  console.log("metaEnv", import.meta.env);

  if (import.meta.env.DEV) {
    return appConfig;
  } else {
    const appConfigStr = getMeta("app_config");

    if (!appConfigStr) return defaultAppConfig;

    return parseEnvVar(appConfigStr);
  }
}

function getMeta(metaName: string) {
  const metas = document.getElementsByTagName("meta");

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("name") === metaName) {
      return metas[i].getAttribute("content");
    }
  }

  return "";
}

function parseEnvVar(envVarURL: string) {
  const arrs = envVarURL.split(",");

  return arrs.reduce((pre, item) => {
    const keyValues = item.split("=");

    return {
      ...pre,
      [keyValues[0]]: keyValues[1],
    };
  }, {} as IConfig);
}
