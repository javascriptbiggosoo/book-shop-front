import { useCallback } from "react";

export const useAlert = () => {
  const shwoAlert = useCallback((message: string) => {
    alert(message);
  }, []);

  return shwoAlert;
};
