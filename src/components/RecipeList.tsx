import "react";
import { useEffect, useState } from "react";
import "../firebase/config.ts";
import { getAllRecipes } from "../firebase/actions";
import { Recipe } from "../types";

export const RecipeList = () => {
  const { recipes, error } = useRecipes();

  return (
    <section>
      <header className="text-3xl font-bold underline">Recipes</header>
      <ul>
        {recipes.map((r) => (
          <li key={r.id}>
            {" "}
            {r.name} - Cook Time: {r.cookTime} minutes
          </li>
        ))}
      </ul>
      {error !== "" && <div>Error:{error}</div>}
    </section>
  );
};

const useRecipes = () => {
  const [error, setError] = useState("");

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  useEffect(() => {
    getAllRecipes()
      .then((recipes) => {
        setRecipes(recipes);
        setError("");
      })
      .catch(() => {
        setError("Something went wronf getting recipes");
      });
  }, []);

  return { recipes, error };
};
