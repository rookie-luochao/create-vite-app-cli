import { useRef } from "react";
import { parseQueryString, toQueryString } from "./utils";
import { useLocation, useNavigate } from "react-router-dom";

export type ParsedUrlQueryValue = string | string[];
export interface ParsedUrlQuery {
  [key: string]: ParsedUrlQueryValue;
}

export function useQuery<T extends ParsedUrlQuery>() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const queryState = useRef(parseQueryString(search) as T);

  const setQuery = (handler: (prevQuery: T) => T) => {
    const nextQuery = handler(queryState.current);
    queryState.current = nextQuery;

    navigate(toQueryString(nextQuery), {
      replace: true,
    });
  };

  return [queryState.current, setQuery] as [T, typeof setQuery];
}
