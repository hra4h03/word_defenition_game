export const useSessionStorage = () => {
  const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const getItem = (key) => {
    return JSON.parse(localStorage.getItem(key));
  };

  return { getItem, setItem };
};
