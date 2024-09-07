import { useCallback, useState } from "react";

export const useToggle = (
  initialState: boolean = false,
): [boolean, (value?: boolean) => void] => {
  const [isOn, setState] = useState(initialState);
  const toggle = useCallback(
    (value?: boolean) => {
      if (value == undefined) {
        setState((on) => !on);
      } else {
        setState(value);
      }
    },
    [isOn, setState],
  );

  return [isOn, toggle];
};
