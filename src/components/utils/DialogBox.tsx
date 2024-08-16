import { forwardRef, ReactNode } from "react";
type DialogBoxProps = {
  children: ReactNode;
  title: string;
  className?: string;
};
export const DialogBox = forwardRef<HTMLDialogElement, DialogBoxProps>(
  ({ children, title, className }, dialogRef) => {
    return (
      <dialog ref={dialogRef} className="w-full max-w-7xl bg-brown text-white">
        <div className={"w-full h-full " + className}>
          <h2 className="col-span-full text-3xl py-6 text-center">{title}</h2>
          {children}
        </div>
      </dialog>
    );
  },
);
