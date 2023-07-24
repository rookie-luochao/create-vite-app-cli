import axios, { AxiosRequestConfig } from "axios";
import { ILoginInfoStorageState, defaultLoginInfoStorage, loginInfoStorageKey } from "../store";
import { getConfig } from "./config";

const BASE_URL = getConfig().baseURL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // 超时时间60秒
});

instance.interceptors.response.use((response) => {
  // 统一错误处理
  // data解构
  if (response.data) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return response.data;
  }
  return response;
});

instance.interceptors.request.use((config) => {
  const loginInfoStorageStr = globalThis.localStorage.getItem(loginInfoStorageKey);
  const loginInfoStorage = loginInfoStorageStr
    ? (JSON.parse(loginInfoStorageStr) as ILoginInfoStorageState)
    : defaultLoginInfoStorage;

  if (loginInfoStorage.state.loginInfo) {
    config.headers.Authorization = loginInfoStorage.state.loginInfo.accessToken;
  }

  return config;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const request = async <T = any>(url: string, options: AxiosRequestConfig & { requestType?: "json" | "form" } = {}) => {
  // 兼容from data文件上传的情况
  const { requestType, ...rest } = options;
  if (requestType === "form") {
    return await instance.request<T, T>({
      url,
      ...rest,
      headers: {
        ...(rest.headers || {}),
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    return await instance.request<T, T>({
      url,
      ...rest,
    });
  }
};

export default request;
