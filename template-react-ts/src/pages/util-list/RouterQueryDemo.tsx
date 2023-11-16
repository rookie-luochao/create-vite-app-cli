import { Card } from "antd";
import ReactMarkdown from "react-markdown";

export function RouterQueryDemo() {
  const routerAuthDemo = `
    ~~~js
    export const mainRoutes: RouteObject = {
      path: mainLayoutPath,
      element: (
        <ShouldLogon>
          <Main />
        </ShouldLogon>
      ),
      children: pagesRoutes,
    };
    
    function ShouldLogon({ children }: { children: ReactNode }) {
      const loginInfoStorageStr = globalThis.localStorage.getItem(loginInfoStorageKey);
    
      if (!loginInfoStorageStr) {
        return <Navigate to="/login" />;
      }
    
      const loginInfo = (JSON.parse(loginInfoStorageStr) as ILoginInfoStorageState).state.loginInfo;
    
      if (!loginInfo || !loginInfo.expireAt || dayjs().isAfter(dayjs(loginInfo.expireAt))) {
        return <Navigate to="/login" />;
      }
    
      return children;
    }    
    ~~~
  `;

  return (
    <div css={{ "& > * + *": { marginTop: 12 } }}>
      <Card title="npm包：react-router-toolkit" bordered={false}>
        <a onClick={() => window.open("https://www.npmjs.com/package/react-router-toolkit")}>查看文档</a>
      </Card>
      <Card title="路由守卫" bordered={false}>
        <ReactMarkdown>{routerAuthDemo}</ReactMarkdown>
      </Card>
    </div>
  );
}
