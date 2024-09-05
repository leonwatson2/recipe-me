import { useCallback, useEffect, useState } from "react";

export function useHistory<T>(initialState?: T) {
  const [position, setPosition] = useState(0);
  const [value, setValue] = useState<T | undefined>(initialState);
  const [history, setHistory] = useState<T[]>();
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (history === undefined) return;
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if(e.shiftKey && history[position + 1] !== undefined) {
          setValue(history[position + 1]);
          setPosition((old) => old + 1);
          return;
        }
        if (!e.shiftKey && history[position - 1] !== undefined) {
          setValue(history[position - 1]);
          setPosition((old) => old - 1);
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [history, position]);
  useEffect(() => {
    if (value === undefined) return;
    if (history === undefined) {
      setHistory([value]);
      return;
    }
    if (value === history[position]) return;
    setPosition((old) => old + 1);
    setHistory((old) => {
      if (old === undefined) return [value];
      if (old.length > 10) {
        old.shift();
      }
      return [...old, value];
    });
  }, [value])
  const resetHistory = useCallback(() => {
    if (value === undefined) return;
    setHistory(undefined);
    setPosition(0);
  }, [value]);
  return [value, setValue, resetHistory] as const;
}
