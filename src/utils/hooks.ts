import { useCallback, useEffect, useState } from "react";

export const useToggle = (
  initialState: boolean = false,
): [boolean, (value?: boolean) => void] => {
  const [isOn, setState] = useState(initialState);
  const toggle = useCallback((value?: boolean) => {
    if (value == undefined) {
      setState((on) => !on);
    } else {
      setState(value)
    }
  }, [isOn, setState]);

  return [isOn, toggle];
};

export const useLog = <T>(loggedValue: T, deps?: React.DependencyList) => {
  useEffect(() => {
    if (import.meta.env.DEV) console.log(loggedValue);
  }, deps);
};
