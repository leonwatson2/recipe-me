
import "react";
import "../../firebase/config.ts";
import { Recipe } from "../RecipePage/types.ts";
import { useEffect, useRef, useState } from "react";
import { getAllRecipes } from "../../firebase/actions.ts";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { RecipeList } from "../RecipeList.tsx";

export const RecipeListPage = () => {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | undefined>(
    undefined,
  );
  const [recievedAll, setRecievedAll] = useState(false);
  const [_, setLoading] = useState(true);
  const fetched = useRef<boolean>(false);
  const getRecipes = () => {
    setLoading(true);
    getAllRecipes(lastDoc)
      .then((results) => {
        setRecipes((recipes) => recipes.concat(results.recipes));
        setLastDoc(results.lastRecipeDoc);

        if (results.lastRecipeDoc === undefined) {
          setRecievedAll(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!fetched.current) getRecipes();

    return () => {
      fetched.current = true;
    };
  }, []);
  return (
    <RecipeList title="Latest Recipes" recipes={recipes} recievedAll={recievedAll} onLoadMore={getRecipes} />
  );
};
