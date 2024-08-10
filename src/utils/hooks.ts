import { useCallback, useEffect, useState } from "react";

export const useToggle = (
  initialState: boolean = false,
): [boolean, () => void] => {
  const [isOn, setState] = useState(initialState);
  const toggle = useCallback(() => {
    setState((on) => !on);
  }, [isOn, setState]);

  return [isOn, toggle];
};

export const useLog = <T>(loggedValue: T, deps?: React.DependencyList) => {
  useEffect(() => {
    console.log(loggedValue);
  }, deps);
};
