import { Avatar, Dropdown, Menu } from "antd";
import { dsc } from "../core/style/defaultStyleConfig";
import { useLoginStore } from "../core/store";
import LogoMiniIcon from "../assets/images/logo_mini.svg";
import LogoIcon from "../assets/images/logo.svg";
import { uiListModuleName } from "../pages/ui-list/routes";
import { BuildOutlined, ToolOutlined } from "@ant-design/icons";
import { Dictionary, parseQueryString } from "../core/router/utils";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { find } from "lodash-es";
import { appRoutes } from "../routes";
import { mainLayoutPath } from "./routes";
import { getMenus } from "./utils";
import { flexCenterOpts } from "../core/style/utils";
import { useNavigate } from "react-router-dom";
import { dashboardModuleName } from "../pages/module/routes";
import { utilListModuleName } from "../pages/util-list/routes";

export const globalHiddenInMenuParentPath = "globalHiddenInMenuParentPath";

export function MenuComp() {
  const defaultMenuActivePath = `/${mainLayoutPath}/${dashboardModuleName}`;
  const [menuActivePath, setMenuActivePath] = useState([defaultMenuActivePath]);
  const pathname = document.location.pathname;
  const menuOpenKey = pathname
    ? pathname
        .split("/")
        .slice(0, pathname.split("/").length - 1)
        .join("/")
    : "";

  useEffect(() => {
    if (pathname) {
      const query = document.location.search;
      let queryObj;
      let menuActivePath = pathname;
      if (query) {
        queryObj = parseQueryString(query);
      }
      if (queryObj && queryObj[globalHiddenInMenuParentPath]) {
        menuActivePath = queryObj[globalHiddenInMenuParentPath];
      }
      setMenuActivePath([menuActivePath]);
    }
  }, [pathname]);

  const modulePathToIconMap = {
    [uiListModuleName]: <BuildOutlined />,
    [utilListModuleName]: <ToolOutlined />,
  } as Dictionary<ReactNode>;

  const menuItems = useMemo(() => {
    const mainRoutes = find(appRoutes[0].children, (route) => route.path === mainLayoutPath);
    return getMenus({
      routes: mainRoutes?.children || [],
      modulePathToIconMap,
      to: mainLayoutPath,
    });
  }, []);

  return (
    <Menu
      theme={"light"}
      mode="inline"
      selectedKeys={menuActivePath}
      defaultOpenKeys={[menuOpenKey]}
      onSelect={({ key }) => {
        setMenuActivePath([key]);
      }}
      items={menuItems}
    />
  );
}

export const Logo = ({ inlineCollapsed }: { inlineCollapsed?: boolean }) => {
  return (
    <div
      className="logo"
      css={{
        height: 80,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src={inlineCollapsed ? LogoMiniIcon : LogoIcon} alt="logo" />
    </div>
  );
};

const UserName = () => {
  const { loginInfo } = useLoginStore((state) => state);

  return (
    <div css={{ display: "flex", alignItems: "center" }}>
      <Avatar shape="square" style={{ backgroundColor: dsc.color.primary, verticalAlign: "middle", borderRadius: 4 }}>
        {loginInfo?.name?.slice(0, 1)}
      </Avatar>
      {loginInfo ? (
        <div css={{ color: dsc.color.text, fontSize: dsc.fontSize.s, padding: "0em 0.6em" }}>{loginInfo?.name}</div>
      ) : null}
    </div>
  );
};

export const IconDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" version="1.1" width="18" height="18" viewBox="0 0 18 18">
    <defs>
      <filter
        id="master_svg0_182_24814"
        filterUnits="objectBoundingBox"
        colorInterpolationFilters="sRGB"
        x="0"
        y="0"
        width="18"
        height="18"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur in="BackgroundImage" stdDeviation="2" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_foregroundBlur" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_foregroundBlur" result="shape" />
      </filter>
    </defs>
    <g>
      <g filter="url(#master_svg0_182_24814)">
        <rect x="0" y="0" width="18" height="18" rx="4" fill="#EEF2F9" fillOpacity="0.8500000238418579" />
      </g>
      <g transform="matrix(-1,0,0,-1,26,24)">
        <path
          d="M13.649878,16.187649999999998C13.387973,16.51503,13.621059,17,14.04031,17L19.959690000000002,17C20.37894,17,20.61203,16.51503,20.35012,16.187649999999998L17.390430000000002,12.488043C17.190269999999998,12.23784,16.809730000000002,12.23784,16.60957,12.488043L13.649878,16.187649999999998Z"
          fill="#8B8EA2"
          fillOpacity="1"
        />
      </g>
    </g>
  </svg>
);

export function ToolBar() {
  const navigate = useNavigate();
  const { clear } = useLoginStore((state) => state);

  return (
    <div
      css={{
        padding: 12,
        height: 64,
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <div css={flexCenterOpts()}>
        <UserName />
        <Dropdown
          menu={{
            items: [
              {
                key: "1",
                label: "退出登录",
                onClick() {
                  clear();
                  navigate("/login");
                },
              },
            ],
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <IconDown />
          </a>
        </Dropdown>
      </div>
    </div>
  );
}
