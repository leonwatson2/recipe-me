import { forwardRef, ReactNode } from "react";
type DialogBoxProps = {
  children: ReactNode;
  title: string;
  className?: string;
};
export const DialogBox = forwardRef<HTMLDialogElement, DialogBoxProps>(
  ({ children, title, className }, dialogRef) => {
    return (
      <dialog
        ref={dialogRef}
        className="absolute mt-auto w-full top-96 max-w-7xl max-h-none bg-brown text-white drop-shadow-lg"
        onClick={()=>{
          
        }}
      >
        <div className={"w-full h-full p-7 " + className}>
          <h2 className="col-span-full text-3xl py-6 text-center">{title}</h2>
          {children}
        </div>
      </dialog>
    );
  },
);
