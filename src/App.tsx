import "./App.css";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./routes.tsx";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <footer className={"h-128 bg-black mt-60"}></footer>
    </>
  );
}

export default App;
