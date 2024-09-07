import { useEffect } from "react";

export const useLog = <T>(loggedValue: T, deps?: React.DependencyList) => {
  useEffect(() => {
    if (import.meta.env.DEV) console.log(loggedValue);
  }, deps);
};
