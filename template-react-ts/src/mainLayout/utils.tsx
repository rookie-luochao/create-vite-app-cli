import { ReactNode } from "react";
import { Dictionary } from "react-router-toolkit";
import { map, startsWith } from "lodash-es";
import { MenuProps } from "antd";
import { Link, RouteObject } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(props: {
  label: React.ReactNode;
  key: React.Key;
  icon?: React.ReactNode;
  children?: MenuItem[];
  type?: "group";
}): MenuItem {
  return props;
}

export const getMenus = ({
  routes,
  modulePathToIconMap = {},
  to = "",
}: {
  routes: RouteObject[];
  modulePathToIconMap?: Dictionary<ReactNode>;
  to?: string;
}) => {
  return map(routes, (item): MenuItem => {
    if (item?.children?.length) {
      const baseRoutePath = `${startsWith(to, "/") ? to : `/${to}`}/${item.path}`;

      return getItem({
        key: baseRoutePath,
        label: item.id || "",
        icon: item.path && modulePathToIconMap?.[item.path],
        children: item.children ? getMenus({ routes: item.children, to: baseRoutePath }) : undefined,
      });
    }

    const routePath = `${startsWith(to, "/") ? to : `/${to}`}/${item.path}`;

    return getItem({
      key: routePath,
      label: <Link to={routePath}>{item.id}</Link>,
      icon: item.path && modulePathToIconMap?.[item.path],
    });
  });
};
