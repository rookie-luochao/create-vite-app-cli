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

* 打包编译 - [vite](https://github.com/vitejs/vite)<br>
* 包管理 - [pnpm](https://github.com/pnpm/pnpm)<br>
* 编程语言 - [typescript](https://github.com/microsoft/TypeScript)<br>
* 前端框架 - [react](https://github.com/facebook/react)<br>
* 路由 - [react-router](https://github.com/remix-run/react-router)<br>
* UI组件库 - [antd](https://github.com/ant-design/ant-design)<br>
* cssinjs - [emotion](https://github.com/emotion-js/emotion)<br>
* 全局数据共享 - [zustand](https://github.com/pmndrs/zustand)<br>
* 自动生成api - [openapi](https://github.com/chenshuai2144/openapi2typescript)<br>
* 网络请求 - [axios](https://github.com/axios/axios)<br>
* 通用hook - [[ahooks](https://github.com/alibaba/hooks)<br>
* hack - [babel](https://github.com/babel/babel)<br>
* 代码检查 - [eslint](https://github.com/eslint/eslint)<br>
* ts代码检查插件 - [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)<br>
* 代码美化 - [prettier](https://github.com/prettier/prettier)<br>
* git钩子 - [husky](https://github.com/typicode/husky)<br>
* commit格式化 -[commitlint](https://github.com/conventional-changelog/commitlint)<br>


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
  // 代码组织命名空间, 例如：CloudNativeApi
  namespace: "",
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
  // 代码环境，例如：demo
  env: "",
};
```