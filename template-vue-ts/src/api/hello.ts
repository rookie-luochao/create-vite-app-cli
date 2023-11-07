// @ts-ignore
/* eslint-disable */
/// <reference types="./typings.d.ts" />
import request from "@request";

/** HelloGet GET /demo-docker/api/v1/hello */
export async function HelloGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Api.HelloGetParams,
  options?: { [key: string]: any },
) {
  return request<Api.HelloResp>("/demo-docker/api/v1/hello", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** HelloPost POST /demo-docker/api/v1/hello */
export async function HelloPost(body: Api.HelloPostParam, options?: { [key: string]: any }) {
  return request<Api.HelloResp>("/demo-docker/api/v1/hello", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
