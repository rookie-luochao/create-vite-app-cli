import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { CreateBrowserRouter } from "./core/router/CreateBrowserRouter";
import { appRoutes } from "./rootRoutes";
import { LazyImportComponent } from "./core/router/LazyImportComponent";
import { TanStackQueryProvider } from "./core/http/TanStackQuery";

import zhCN from "antd/locale/zh_CN";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <LazyImportComponent>
        <TanStackQueryProvider>
          <CreateBrowserRouter routes={appRoutes} />
        </TanStackQueryProvider>
      </LazyImportComponent>
    </ConfigProvider>
  </React.StrictMode>,
);
