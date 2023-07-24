import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLoginStore } from "../core/store";
import { ParsedUrlQuery, useQuery } from "../core/router/UseQuery";

interface IQuery extends ParsedUrlQuery {
  a: string | string[];
  b: string;
}

export default function Login() {
  const { loginInfo, updateLoginInfo, clear } = useLoginStore((state) => state);
  const [query, setQuery] = useQuery<IQuery>();

  useEffect(() => {
    console.log("query: ", query);
  }, [query]);

  return (
    <div>
      <h3 css={{ fontSize: 24 }}>this is login page</h3>
      <div>
        <Link to="/main/module1">goto module1</Link>
      </div>
      token: {loginInfo?.accessToken}
      <div>
        <a
          onClick={() => {
            setQuery((preState) => ({
              ...preState,
              a: `${Number(preState.a || 0) + 1}`,
              b: `${Number(preState.b || 0) + 1}`,
            }));
          }}
        >
          测试query
        </a>
      </div>
      <div>
        {loginInfo ? (
          <a onClick={clear}>注销登录</a>
        ) : (
          <a
            css={{
              marginTop: 20,
              color: "red",
              fontWeigth: 700,
              fontSize: 24,
            }}
            onClick={() => {
              updateLoginInfo({ accessToken: "123" });
            }}
          >
            登录
          </a>
        )}
      </div>
    </div>
  );
}
