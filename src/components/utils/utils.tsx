import { createElement, FC, useEffect, useState } from "react";
import { SVG } from "../../assets/SvgElements";
import { ModifyListItemFunction } from "../../types";

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
  const {
    className,
    onChange,
    onKeyUp,
    maxLength,
    placeholder,
    onPaste,
    wrap,
  } = props;
  const [innerValue, setInnerValue] = useState<string | number>("Nothing");
  useEffect(() => {
    setInnerValue(value);
  }, [value, editing]);

  if (editing) {
    return (
      <textarea
        wrap={wrap}
        value={innerValue}
        onChange={(e) => setInnerValue(e.currentTarget.value.replace("\n", ""))}
        onBlur={onChange}
        rows={
          wrap !== "wrap"
            ? Math.ceil((innerValue.toString().length + 1) / 40)
            : 2
        }
        maxLength={maxLength}
        className={
          className + " w-full bg-transparent cursor-pointer overflow-hidden"
        }
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        autoFocus={innerValue === ""}
        onPaste={onPaste}
      />
    );
  }
  return createElement(element, props, value);
};

export const PlusMinusButtons: FC<{
  addFn: ModifyListItemFunction;
  removeFn: ModifyListItemFunction;
  index: number;
  editing: boolean;
}> = ({ addFn, removeFn, index, editing }) => {
  if (!editing) return null;
  return (
    <>
      <SVG
        title="plus"
        className="w-16 max-w-fit h-10 cursor-pointer"
        svgClassName="fill-primary hover:fill-grey  transition-colors "
        tabIndex={0}
        onClick={(e) => {
          addFn(index);

          const parent = e.currentTarget.parentElement;
          setTimeout(
            () => (parent?.nextSibling?.firstChild as HTMLElement).focus(),
            50,
          );
        }}
      />
      <SVG
        title="minus"
        className="w-16 max-w-fit h-10 cursor-pointer"
        svgClassName="fill-primary hover:fill-grey  transition-colors"
        tabIndex={0}
        onClick={() => {
          removeFn(index);
        }}
      />
    </>
  );
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
