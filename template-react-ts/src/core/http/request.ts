import axios, { AxiosRequestConfig } from "axios";
import { ILoginInfoStorageState, defaultLoginInfoStorage, loginInfoStorageKey } from "../store";
import { getConfig } from "./config";
import { notification } from "antd";

const BASE_URL = getConfig().baseURL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 120000, // 超时时间120秒
});

instance.interceptors.response.use(
  (response) => {
    // data解构
    if (response.data) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return response.data;
    }
    return response;
  },
  (error) => {
    // 统一错误处理
    if (error.response.status >= 300) {
      notification.error({
        message: error.response.data?.msg,
        duration: 2,
      });
    }
    return Promise.reject(error);
  },
);

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
