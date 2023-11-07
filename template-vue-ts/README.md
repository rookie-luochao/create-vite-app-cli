# Vue 3 + TypeScript + Vite + Pnpm + Pinia + Openapi + Docker

该模板可以帮助您在 Vite 中使用 Vue 3 和 TypeScript 进行开发. 该模板使用 Vue 3 `<script setup>` SFCs, 打开 [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) 去学习.

#### 概览
* 学习搭建一个vue应用开发脚手架，最大限度使用社区优秀开源方案
* 支持自动根据openapi生成api request函数、类型、枚举等, [openapi格式参考](https://srv-demo-docker.onrender.com/openapi)
* 支持前端工程化
* 支持前端容器化(需要安装docker环境)
* 同步接口请求状态，实现自动loading
* 支持接口联动，方便跨父子组件刷新相关联的接口
* 支持容器化变量注入，无需前端配置文件写死，方便通过 k8s 动态注入

#### 核心技术
* 打包编译 - [vite](https://github.com/vitejs/vite)
* 包管理 - [pnpm](https://github.com/pnpm/pnpm)
* 编程语言 - [typescript](https://github.com/microsoft/TypeScript)
* 前端框架 - [vue](https://github.com/vuejs/core)
* 路由 - [vue-router](https://github.com/vuejs/router)
* UI组件库 - [element-plus](https://github.com/element-plus/element-plus)
* 全局数据共享 - [pinia](https://github.com/vuejs/pinia)
* 自动生成api - [openapi](https://github.com/chenshuai2144/openapi2typescript)
* 网络请求 - [axios](https://github.com/axios/axios)
* 数据请求利器 - [vue-query](https://github.com/TanStack/query/tree/main/packages/vue-query)
* 通用hook(可不用) - [vueuse](https://github.com/vueuse/vueuse)
* hack - [babel](https://github.com/babel/babel)
* 代码检查 - [eslint](https://github.com/eslint/eslint)
* ts代码检查插件 - [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
* 代码美化 - [prettier](https://github.com/prettier/prettier)
* git钩子 - [husky](https://github.com/typicode/husky)
* commit格式化 -[commitlint](https://github.com/conventional-changelog/commitlint)

#### 技术说明
* 自动生成api(openapi): 后端接入apenapi后，前端可以根据openapi文件自动生成request api
* 通用hook(vueuse): 一个hook工具库，该库可以依据个人喜好选择是否使用
  
#### 快速开始
```bash
// 下载包
pnpm install
# or make install

// 启动
npm run dev
# or make dev
```

#### 其他常用命令
```bash
// 打包
npm run build
# or make build

// 拉取openapi=>自动生成api request
npm run openapi
# or make openapi

// 制作docker镜像
make docker-build

// 运行docker镜像
make docker-run

// 制作docker镜像 and 运行docker镜像
make docker-build-run
```

#### 注意事项
* 如果遇到git commit无法触发husky的情况，则需要手动执行一遍`npm run prepare`

#### 基于openapi自动获取api请求函数，配置如下
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

// 一级path, 例如：openapi
export const urlPath = "";

// 项目基本变量配置
const appConfig: IConfig = {
  // 应用名称, 例如：webapp-vue
  appName: "",
  // 网络请求的域名，例如：https://host
  baseURL: "",
  // 发布版本，例如：0000000-0.0.1
  version: "",
  // 代码环境，例如：demo, staging, online
  env: "",
};
```

#### 环境变量
* 项目 dev 环境变量配置在`src/config.ts`
* 项目 prod 环境变量配置在`.env.production`，详情参考：[vite环境变量](https://cn.vitejs.dev/guide/env-and-mode.html)
* 项目 prod 环境变量也可以使用容器变量 ARG，我们会读取容器变量并注入到前端meta标签的content里面，目前html文件提供了两个mate标签(env、app_config)接收变量，格式详情参考：`index.html` 和 `src/core/http/config.ts`

#### 调用接口(react-query), 支持自动loading和接口请求联动
```bash
// HelloGet是一个基于axios的promise请求
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

// 自动调用接口获取数据
const name = ref("zhangsan");
const { data, isPending, refetch } = useQuery({
  queryKey: ["helloGet", name],
  queryFn: () => HelloGet({ name: name.value || "" }),
});

// HelloPost是一个基于axios的promise请求
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

// 提交编辑数据
const queryClient = useQueryClient();
const userStore = useUserStore();
const { mutate, isPending } = useMutation({
  mutationFn: HelloPost,
  onSuccess: (res) => {
    // 第一种刷新方式：修改store
    userStore.updateUserInfo({ name: res.data });
    // 第二种刷新方式：通过清除vue-query缓存key
    queryClient.invalidateQueries({ queryKey: ["helloGet"] });
  },
});

mutate({ name: "lisi" });

```

#### 推荐的IDE环境

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (禁用 Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## TS 中对 `.vue` 导入的类型支持

默认情况下，TypeScript 无法处理 `.vue` 导入的类型信息，因此我们将 `tsc` CLI 替换成 `vue-tsc` 进行类型检查. 在编辑器, 我们需要 [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) 使 TypeScript 语言服务能够识别 `.vue` 类型.

如果您觉得独立的 TypeScript 插件不够快, Volar 还实现成了 [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) 使性能更高. 您可以通过以下步骤启用它:

1. 禁用内置 TypeScript 扩展
   1. 使用 VSCode's 命令面板运行 `Extensions: Show Built-in Extensions` 
   2. 发现 `TypeScript and JavaScript Language Features`, 右键单击并选择 `Disable (Workspace)`
2. 重新加载 VSCode 窗口，通过从命令面板运行 `Developer: Reload Window` .
