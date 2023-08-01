import { useState } from "react";
import { DatePicker, DatePickerProps /* , Spin */ } from "antd";
import { Outlet } from "react-router-dom";
// import { HelloGet, HelloPost } from "../api/hello";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import "./index.css";

export default function MainLayout() {
  // const queryClient = useQueryClient();
  const [count, setCount] = useState(0);
  // const [name, setName] = useState("zhangshan");

  // const { data } = useQuery({
  //   queryKey: ["hello", name],
  //   queryFn: () => {
  //     return HelloGet({ name: name });
  //   },
  // });

  // const { isLoading, mutate } = useMutation({
  //   mutationFn: HelloPost,
  //   onSuccess(data) {
  //     setName(data?.data || "");
  //   },
  //   onError() {
  //     queryClient.invalidateQueries({ queryKey: ['hello'] });
  //   }
  // })

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div className="App">
      {/* <Spin spinning={isLoading}>
        {data?.data}
      </Spin> */}
      {/* <div>
        <a
          onClick={() => {
            mutate({ name: "lisi" });
          }}
        >
          调用接口
        </a>
      </div> */}
      <DatePicker onChange={onChange} />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
      <Outlet />
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}
