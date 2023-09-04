import { useEffect, useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { fromEvent, throttleTime } from "rxjs";
import Sider from "antd/es/layout/Sider";
import { dsc } from "../core/style/defaultStyleConfig";
import { Logo, MenuComp, ToolBar } from "./MainLayoutComp";

export function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuHeight, setMenuHeight] = useState(document.documentElement.clientHeight);
  const defaultMenuTitleHeight = 64;

  useEffect(() => {
    const subscription = fromEvent(window, "resize")
      .pipe(throttleTime(1000))
      .subscribe(() => {
        const timeoutId = globalThis.setTimeout(() => {
          setMenuHeight(document.documentElement.clientHeight);
        }, 100);
        return () => {
          globalThis.clearTimeout(timeoutId);
        };
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Layout>
      <Sider
        theme={"light"}
        width={240}
        css={{ height: menuHeight, overflow: "scroll" }}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <Logo inlineCollapsed={collapsed} />
        <MenuComp />
      </Sider>
      <Layout className="site-layout" css={{ backgroundColor: dsc.color.bg }}>
        <ToolBar />
        <div
          css={{
            padding: 24,
            backgroundColor: dsc.color.bgGray,
            overflow: "scroll",
            height: menuHeight - defaultMenuTitleHeight,
            borderRadius: "10px 0 0",
          }}
        >
          <Outlet />
        </div>
      </Layout>
    </Layout>
  );
}
