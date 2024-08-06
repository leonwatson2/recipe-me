import "./App.css";
import "./index.css";

import { MainNav } from "./components/Navigation";
import { SvgElements } from "./assets/SvgElements.tsx";
import { RecipePage } from "./components/RecipePage";

function App() {
  return (
    <>
    <MainNav />
      <SvgElements />
      <RecipePage />
      <footer className={'h-128 bg-black mt-60'}>

      </footer>
    </>
  );
}

export default App;
