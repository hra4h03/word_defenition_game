import { useCallback } from "react";

export const useFetch = () => {
  const get = useCallback(async (url) => {
    try {
      let res = await fetch(url);
      let data = await res.json();
      return data;
    } catch (e) {
      return false;
    }
  }, []);

  return get;
};
