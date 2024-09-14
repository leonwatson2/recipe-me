
import "react";
import "../../firebase/config.ts";
import { Recipe } from "../RecipePage/types.ts";
import { FC, useEffect, useRef, useState } from "react";
import { getAllRecipes } from "../../firebase/actions.ts";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { RecipeList } from "./RecipeList.tsx";

export const RecipeListPage: FC<{ archived?: boolean }> = ({ archived }) => {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | undefined>(
    undefined,
  );
  const [recievedAll, setRecievedAll] = useState(true);
  const [loading, setLoading] = useState(true);
  const fetched = useRef<boolean>(false);
  const getRecipes = () => {
    setLoading(true);
    getAllRecipes({ lastRecipeDoc: lastDoc, archived })
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
    if (!loading){
      getRecipes();
    }
    return () => {
      setRecipes([]);
    }
  }, [archived])
  useEffect(() => {
    if (!fetched.current) getRecipes();

    return () => {
      fetched.current = true;
    };
  }, []);
  return (
    <RecipeList
      title={`${archived ? 'Archived' : 'Lastest'} Recipes`}
      loading={loading}
      archived={archived}
      recipes={recipes}
      recievedAll={recievedAll}
      onLoadMore={getRecipes}
    />
  );
};
