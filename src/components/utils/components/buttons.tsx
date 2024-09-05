import { FC, ButtonHTMLAttributes, ReactNode } from "react";
import { ModifyListItemFunction } from "../../RecipePage/types";
import { SVG } from "../../../assets/SvgElements";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  chidren?: ReactNode;
};

export const Button: FC<ButtonProps> = ({ children, className,...props }) => {
  return (
    <button
      className={"bg-black h-16 uppercase hover:bg-lbrown transition " + className }
      {...props}
    >
      {children}
    </button>
  );
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
        className="w-16 max-w-fit h-10 cursor-pointer outline-secondary"
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
        className="w-16 max-w-fit h-10 cursor-pointer outline-secondary"
        svgClassName="fill-primary hover:fill-grey  transition-colors"
        tabIndex={0}
        onClick={() => {
          removeFn(index);
        }}
      />
    </>
  );
};
