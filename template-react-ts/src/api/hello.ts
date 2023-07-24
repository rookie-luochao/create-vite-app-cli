// @ts-ignore
/* eslint-disable */
/// <reference types="./typings.d.ts" />
import request from "@request";

/** HelloGet GET /gin-demo-server/api/v1/hello */
export async function HelloGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CloudNativeApi.HelloGetParams,
  options?: { [key: string]: any },
) {
  return request<CloudNativeApi.HelloResp>("/gin-demo-server/api/v1/hello", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** HelloGet HelloPost POST /gin-demo-server/api/v1/hello */
export async function HelloPost(body: CloudNativeApi.HelloPostParam, options?: { [key: string]: any }) {
  return request<CloudNativeApi.HelloResp>("/gin-demo-server/api/v1/hello", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** HelloGetWithPath GET /gin-demo-server/api/v1/hello/${param0} */
export async function HelloGetWithPath(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CloudNativeApi.HelloGetWithPathParams,
  options?: { [key: string]: any },
) {
  const { age: param0, ...queryParams } = params;
  return request<CloudNativeApi.HelloResp>(`/gin-demo-server/api/v1/hello/${param0}`, {
    method: "GET",
    params: {
      ...queryParams,
    },
    ...(options || {}),
  });
}
