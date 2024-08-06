import "./App.css";
import "./index.css";
import { RecipeList } from "./components/RecipeList.tsx";
import { MainNav } from "./components/Navigation/MainNav.tsx";
import { SvgElements } from "./assets/SvgElements.tsx";

function App() {
  return (
    <>
    <MainNav />
      <h1>Recipe Book</h1>
      <RecipeList />
      <SvgElements />
    </>
  );
}

export default App;
