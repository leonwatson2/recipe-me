import { Outlet } from "react-router-dom";
import { MainNav } from "./Navigation";
import { SvgElements } from "../assets/SvgElements";

export function Root() {
  return (
    <>
      <MainNav />
      <SvgElements />
      <Outlet />
    </>
  );
}

export default Root;
