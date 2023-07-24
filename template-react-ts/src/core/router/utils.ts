import { reduce } from "lodash-es";
import { ParsedUrlQueryValue } from "./UseQuery";

export interface Dictionary<T> {
  [key: string]: T;
}

// 将queryMap数据转换成queryString
export function toQueryString(queryObj: Dictionary<ParsedUrlQueryValue>) {
  if (!queryObj) return "";

  const keyValueString = reduce(
    queryObj,
    (pre, value, key) => {
      let keyValueString = "";

      if (Array.isArray(value)) {
        keyValueString = reduce(
          value,
          (cPre, item) => {
            return cPre ? `${cPre}&${key}=${item}` : `${key}=${item}`;
          },
          "",
        );
      } else {
        keyValueString = `${key}=${value}`;
      }

      return pre ? `${pre}&${keyValueString}` : keyValueString;
    },
    "",
  );

  return `?${keyValueString}`;
}

type ParseParam<Param extends ParsedUrlQueryValue> = Param extends `${infer Key}=${infer Value}`
  ? {
      [K in Key]: Value;
    }
  : Record<string, any>;

type MergeValues<One, Other> = One extends Other ? One : Other extends unknown[] ? [One, ...Other] : [One, Other];

type MergeParams<OneParam extends Record<string, any>, OtherParam extends Record<string, any>> = {
  readonly [Key in keyof OneParam | keyof OtherParam]: Key extends keyof OneParam
    ? Key extends keyof OtherParam
      ? MergeValues<OneParam[Key], OtherParam[Key]>
      : OneParam[Key]
    : Key extends keyof OtherParam
    ? OtherParam[Key]
    : never;
};

export type ParseQueryString<Str extends ParsedUrlQueryValue> = Str extends `${infer Param}&${infer Rest}`
  ? MergeParams<ParseParam<Param>, ParseQueryString<Rest>>
  : ParseParam<Str>;

// 解析queryString转换为queryMap, 暂时只兼容正确格式例如：name=zhangshan&age=12或?name=zhangshan&age=12
export function parseQueryString<Str extends string>(queryStr: Str): ParseQueryString<Str>;
export function parseQueryString(queryString: string) {
  if (!queryString || !queryString.trim()) {
    return {};
  }
  if (queryString.startsWith("?")) {
    queryString = queryString.slice(1);
  }

  const queryObj: Record<string, any> = {};
  const items = queryString.split("&");

  items.forEach((item) => {
    const [key, value] = item.split("=");

    if (queryObj[key]) {
      if (Array.isArray(queryObj[key])) {
        (queryObj[key] as Array<string>).push(value);
      } else {
        queryObj[key] = [queryObj[key], value];
      }
    } else {
      queryObj[key] = value;
    }
  });

  return queryObj;
}
