import { useState } from "react";
import { DatePicker, DatePickerProps, Spin } from "antd";
import { useRequest } from "ahooks";
import { Outlet } from "react-router-dom";
import { HelloGet } from "../api/hello";
import "./index.css";

export default function MainLayout() {
  const [count, setCount] = useState(0);

  const { run, refresh, data, loading } = useRequest(HelloGet, {
    manual: true,
  });

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="App">
      <div>
        <a
          onClick={() => {
            run({ name: "zhangsan" });
          }}
        >
          调用接口
        </a>
        <a onClick={refresh} style={{ marginLeft: 6 }}>
          重刷接口
        </a>
      </div>
      <Spin spinning={loading}>
        <div>接口数据：{data?.data}</div>
      </Spin>
      <DatePicker onChange={onChange} />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
      <Outlet />
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}
