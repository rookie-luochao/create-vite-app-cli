import { useSearchParams } from "react-router-dom";

export default function Module3() {
  const [searchParams] = useSearchParams();

  return (
    <div>
      this is module3
      <div>name: {searchParams.get("name")}</div>
      <div>age: {searchParams.get("age")}</div>
    </div>
  );
}
