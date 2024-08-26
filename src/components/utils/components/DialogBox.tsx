import { forwardRef, ReactNode } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
type DialogBoxProps = {
  children: ReactNode;
  title: string;
  className?: string;
};
const variants = {
  in: {
    y:0,
    opacity: 1,
  },
  out:{
    y:10,
    opacity: 0
  }
}
export const DialogBox = forwardRef<HTMLDialogElement, DialogBoxProps>(
  ({ children, title, className }, dialogRef) => {
    return createPortal(
      <motion.dialog
        variants={variants}
        initial={"out"}
        animate={"in"}
        transition={{ duration: 0.4 }}
        ref={dialogRef}
        className="absolute mt-auto w-full top-24 max-w-7xl max-h-none bg-brown text-white drop-shadow-lg"
        onClick={()=>{
          
        }}
      >
        <div className={"w-full h-full p-7 " + className}>
          <h2 className="col-span-full text-3xl py-6 text-center">{title}</h2>
          {children}
        </div>
      </motion.dialog>, document.body);
  },
);

