import { useCallback } from "react";

export const useLocalStorage = () => {
  const setItem = useCallback((key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, []);
  const getItem = useCallback((key) => {
    return JSON.parse(localStorage.getItem(key));
  }, []);

  return { getItem, setItem };
};
