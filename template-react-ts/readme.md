#### 说明

```
学习搭建一个web应用开发脚手架，最大限度使用社区优秀开源方案(ps: 因为有文档, 有维护者解决pr和issue!!!)
```

#### 快速开始

```bash
// 下载包
pnpm install

// 启动
pnpm dev
```

#### 其他常用命令

```bash
// 打包
pnpm build

// 拉取openapi=>自动生成api request
pnpm openapi
```

#### 注意事项

```
如果遇到git commit无法触发husky的情况，则需要手动执行一遍pnpm prepare
```

#### 核心技术

* 打包编译 - [vite](https://github.com/vitejs/vite)
* 包管理 - [pnpm](https://github.com/pnpm/pnpm)
* 编程语言 - [typescript](https://github.com/microsoft/TypeScript)
* 前端框架 - [react](https://github.com/facebook/react)
* 路由 - [react-router](https://github.com/remix-run/react-router)
* UI组件库 - [antd](https://github.com/ant-design/ant-design)
* cssinjs(不考虑性能开销) - [emotion](https://github.com/emotion-js/emotion)
* 全局数据共享 - [zustand](https://github.com/pmndrs/zustand)
* 自动生成api - [openapi](https://github.com/chenshuai2144/openapi2typescript)
* 网络请求 - [axios](https://github.com/axios/axios)
* 数据请求利器 - [react-query](https://github.com/TanStack/query)
* 通用hook(可不用) - [ahooks](https://github.com/alibaba/hooks)
* 错误边界 - [react-error-boundary](https://github.com/bvaughn/react-error-boundary)
* 前端日志(暂未集成) - [sentry-javascript](https://github.com/getsentry/sentry-javascript)
* hack - [babel](https://github.com/babel/babel)
* 代码检查 - [eslint](https://github.com/eslint/eslint)
* ts代码检查插件 - [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
* 代码美化 - [prettier](https://github.com/prettier/prettier)
* git钩子 - [husky](https://github.com/typicode/husky)
* commit格式化 -[commitlint](https://github.com/conventional-changelog/commitlint)

#### 技术说明

```
通用hook(ahooks): 一个hook工具库，该库可以依据个人喜好选择是否使用

路由(react-router-dom): 自身默认支持错误边界功能，我觉得react-error-boundary更好用点，所以用hack绕过了react-router-dom的错误边界(ps: 暂时不支持参数禁用错误边界)

前端日志(sentry): 暂时未集成，需要进一步调研实用性和可用性

自动生成api(openapi): 后端接入apenapi后，前端可以根据openapi文件自动生成request api
```


#### 基于openapi自动获取api请求函数

```bash
// src/core/openapi/index.ts

// 示例代码
generateService({
  // openapi地址
  schemaPath: `${appConfig.baseURL}/${urlPath}`,
  // 文件生成目录
  serversPath: "./src",
  // 自定义网络请求函数路径
  requestImportStatement: `/// <reference types="./typings.d.ts" />\nimport request from "@request"`,
  // 代码组织命名空间, 例如：Api
  namespace: "Api",
});

```


#### 应用配置

```bash
// src/config.ts

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
  // 代码环境，例如：demo, staging, online
  env: "",
};
```

#### 调用接口(react-query), 支持自动loading和接口请求联动

```bash
// HelloGet是一个基于axios的promise请求
export async function HelloGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: Api.HelloGetParams,
  options?: { [key: string]: any },
) {
  return request<Api.HelloResp>('/gin-demo-server/api/v1/hello', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

// 自动调用接口获取数据
const { data, isLoading } = useQuery({
  queryKey: ["hello", name],
  queryFn: () => {
    return HelloGet({ name: name });
  },
});

export async function HelloPost(body: Api.HelloPostParam, options?: { [key: string]: any }) {
  return request<Api.HelloResp>('/gin-demo-server/api/v1/hello', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 提交编辑数据
const { mutate, isLoading } = useMutation({
  mutationFn: HelloPost,
  onSuccess(data) {
    setName(data?.data || "");
  },
  onError() {
    // 清除queryKey为hello的接口数据缓存，自动重新获取接口数据
    queryClient.invalidateQueries({ queryKey: ['hello'] });
  }
})

mutate({ name: "lisi" });

```