import { Link, useParams } from "react-router-dom";

export default function Module2() {
  const params = useParams();

  return (
    <div>
      this is module2
      <div>{JSON.stringify(params)}</div>
      <div>
        <Link to="/main/module3?name=zhangshan&age=12">goto module3(触发报错页面)</Link>
      </div>
    </div>
  );
}
