import { FC, ReactNode } from "react";

export const MainNavWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <header className="mx-auto center w-auto bg-primary sticky top-0 z-10">
      <nav className="container mx-auto max-w-7xl h-16">
        <ul className="flex text-xl h-16">{children}</ul>
      </nav>
    </header>
  );
};
