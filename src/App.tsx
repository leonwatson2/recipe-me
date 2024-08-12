import "./App.css";
import "./index.css";

import { MainNav } from "./components/Navigation";
import { SvgElements } from "./assets/SvgElements.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";

function App() {
  return (
    <>
      <MainNav />
      <SvgElements />
      <RouterProvider router={router} />
      <footer className={"h-128 bg-black mt-60"}></footer>
    </>
  );
}

export default App;
