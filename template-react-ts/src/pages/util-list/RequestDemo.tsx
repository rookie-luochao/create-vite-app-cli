import { Card } from "antd";
import ReactMarkdown from "react-markdown";

export function RequestDemo() {
  const getRequestDemo = `
    ~~~js
      // HelloGet是一个基于axios的promise请求
      export async function HelloGet(
        // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
        params: Api.HelloGetParams,
        options?: { [key: string]: any },
      ) {
        return request<Api.HelloResp>('/gin-demo-server/api/v1/hello', {
          method: 'GET',
          params: {
            ...params,
          },
          ...(options || {}),
        });
      }

      // 自动调用接口获取数据
      const { data, isLoading } = useQuery({
        queryKey: ["hello", name],
        queryFn: () => {
          return HelloGet({ name: name });
        },
      });

      // dom
      <Spin spinning={isLoading}>
        {data?.data}
      </Spin>
    ~~~
  `;

  const postRequestDemo = `
    ~~~js
      export async function HelloPost(body: Api.HelloPostParam, options?: { [key: string]: any }) {
        return request<Api.HelloResp>('/gin-demo-server/api/v1/hello', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          data: body,
          ...(options || {}),
        });
      }

      // 提交编辑数据
      const { mutate, isLoading } = useMutation({
        mutationFn: HelloPost,
        onSuccess(data) {
          setName(data?.data || "");
        },
        onError() {
          // 清除queryKey为hello的接口数据缓存，自动重新获取接口数据
          queryClient.invalidateQueries({ queryKey: ['hello'] });
        }
      })

      mutate({ name: "lisi" });
    ~~~
  `;

  const requestDemo = `
    ~~~js
      // 自动调用接口获取数据
      const { data, isLoading } = useQuery({
        queryKey: ["hello", name],
        queryFn: () => {
          return HelloGet({ name: name });
        },
      });

      // 提交编辑数据
      const { mutate, isLoading } = useMutation({
        mutationFn: HelloPost,
        onSuccess(data) {
          setName(data?.data || "");
        },
        onError() {
          // 清除queryKey为hello的接口数据缓存，自动重新获取接口数据
          queryClient.invalidateQueries({ queryKey: ['hello'] });
        }
      })

      mutate({ name: "lisi" });
    ~~~
  `;

  return (
    <div css={{ "& > * + *": { marginTop: 12 } }}>
      <Card title="获取数据" bordered={false}>
        <ReactMarkdown>{getRequestDemo}</ReactMarkdown>
      </Card>
      <Card title="更新数据" bordered={false}>
        <ReactMarkdown>{postRequestDemo}</ReactMarkdown>
      </Card>
      <Card title="接口联动" bordered={false}>
        <ReactMarkdown>{requestDemo}</ReactMarkdown>
      </Card>
    </div>
  );
}
