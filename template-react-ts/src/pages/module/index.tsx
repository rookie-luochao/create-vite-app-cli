import { Button } from "antd";
import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";

export default function Dashboard() {
  const [obj, setObj] = useState<any>({ a: { b: "no error! " } }); // eslint-disable-line @typescript-eslint/no-explicit-any
  const { showBoundary } = useErrorBoundary();

  return (
    <div>
      this is dashboard
      <div>{obj.a.b}</div>
      <div css={{ marginBottom: 12 }}>
        <Button
          type="primary"
          danger
          onClick={() => {
            showBoundary(new Error("this is error! "));
          }}
        >
          手动new Error抛错
        </Button>
      </div>
      <div>
        <Button
          type="primary"
          danger
          onClick={() => {
            setObj({});
          }}
        >
          运行报错
        </Button>
      </div>
    </div>
  );
}
