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
  const {
    className,
    onChange,
    onKeyUp,
    maxLength,
    placeholder,
    onPaste,
    inputMode,
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
        inputMode={inputMode}
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


