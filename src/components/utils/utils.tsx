import { createElement, FC, useEffect, useState } from "react";

type EditableProps = {
  element: keyof React.ReactHTML;
  editing: boolean;
  value: string | number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export const Editable: FC<EditableProps> = ({
  element,
  editing,
  value,
  ...props
}) => {
  const { className, onChange, onKeyUp, maxLength, placeholder } = props;
  const [innerValue, setInnerValue] = useState<string | number>("Nothing");
  useEffect(() => {
    setInnerValue(value);
  }, [value, editing]);

  if (editing) {
    return (
      <textarea
        value={innerValue}
        onChange={(e) => setInnerValue(e.currentTarget.value.replace("\n", ""))}
        onBlur={onChange}
        rows={Math.ceil(innerValue.toString().length / 40)}
        maxLength={maxLength}
        className={
          className + " w-full bg-transparent cursor-pointer overflow-hidden"
        }
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        autoFocus={innerValue === ""}
      />
    );
  }
  return createElement(element, props, value);
};

function isObject(value: unknown): value is Record<string, any> {
  return value !== null && typeof value === "object";
}

export function deepEqual<T>(x: T, y: T): boolean {
  if (x === y) return true;

  const notObjects = !isObject(x) || !isObject(y);
  if (notObjects) return false;

  const keysX = Object.keys(x) as Array<keyof T>;
  const keysY = Object.keys(y) as Array<keyof T>;

  if (keysX.length !== keysY.length) return false;

  for (const key of keysX) {
    if (!keysY.includes(key) || !deepEqual(x[key], y[key])) {
      return false;
    }
  }

  return true;
}
