import { useState } from "react";
import { DatePicker, DatePickerProps } from "antd";
import { Outlet } from "react-router-dom";
// import { useRequest } from "ahooks";
// import { HelloGet } from "../api/hello";
import "./index.css";

export default function MainLayout() {
  const [count, setCount] = useState(0);

  // const { run, refresh, data, loading } = useRequest(HelloGet, {
  //   manual: true,
  // });

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="App">
      <div>
        <a
          onClick={() => {
            // run({ name: "zhangsan" });
          }}
        >
          调用接口
        </a>
      </div>
      <DatePicker onChange={onChange} />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
      <Outlet />
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}
