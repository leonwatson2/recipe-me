import { FC, useEffect, useState } from "react";
import { RecipeList } from "./RecipeList";
import { createSearchParams, useLocation } from "react-router-dom";
import { searchForRecipe } from "../firebase/actions";
import { Recipe } from "./RecipePage/types";
import { SEARCH_TERM_KEY } from "@Utils";
export const SearchPage: FC = () => {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const location = useLocation();
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (createSearchParams(location.search).has(SEARCH_TERM_KEY)) {
      const searchTerm =
        createSearchParams(location.search).get(SEARCH_TERM_KEY) || "";
      setSearch(searchTerm);
      searchForRecipe(searchTerm).then((result) => {
        setRecipes(result);
      });
    }
  }, [location]);

  return (
    <RecipeList
      title={"Search: " + search}
      recievedAll={true}
      recipes={recipes}
    />
  );
};
