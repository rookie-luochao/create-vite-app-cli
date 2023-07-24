// @ts-ignore
/* eslint-disable */
/// <reference types="./typings.d.ts" />
import request from "@request";

/** 获取用户 GET /gin-demo-server/api/v1/users */
export async function ListUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: CloudNativeApi.ListUserParams,
  options?: { [key: string]: any },
) {
  return request<CloudNativeApi.ListUserResp>("/gin-demo-server/api/v1/users", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 创建用户 POST /gin-demo-server/api/v1/users */
export async function CreateOrUpdateUser(
  body: CloudNativeApi.CreateOrUpdateUserBody,
  options?: { [key: string]: any },
) {
  return request<CloudNativeApi.ErrorResp>("/gin-demo-server/api/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}
