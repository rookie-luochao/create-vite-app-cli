import { Link } from "react-router-dom";

export default function Module1() {
  return (
    <div>
      this is module1
      <div>
        <Link to="/main/module2/123456">goto module2</Link>
      </div>
    </div>
  );
}
