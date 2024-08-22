import { FC, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  chidren?:ReactNode
}

export const Button:FC<ButtonProps> = ({children, ...props}) => {
  return <button className='bg-black h-16 uppercase hover:bg-lbrown transition' {...props}>{children}</button>
}
