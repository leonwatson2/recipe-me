import { createElement, FC, useEffect, useState, memo } from "react";

type EditableProps = {
  element: keyof React.ReactHTML;
  editing: boolean;
  value: string | number;
  testId?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;
export const Editable: FC<EditableProps> = memo(({
  element,
  editing,
  value,
  testId,
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
        data-testid={"input-"+testId}
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
          className + " w-full bg-transparent cursor-pointer overflow-hidden transition outline-secondary"
        }
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        autoFocus={innerValue === ""}
        onPaste={onPaste}
      />
    );
  }
  return createElement(element, props, value);
}, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value && prevProps.editing === nextProps.editing;
})


