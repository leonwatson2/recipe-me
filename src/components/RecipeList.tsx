import "react";
import "../firebase/config.ts";
import { Recipe } from "../types";
import { Link, useLoaderData } from "react-router-dom";

export const RecipeList = () => {
  const recipes = useLoaderData() as Array<Recipe>;

  return (
    <section className="mx-auto max-w-7xl relative pt-7">
      <header className="text-7xl font-bold  mb-7">Lastest Recipes</header>
      <ul className="grid grid-cols-4 gap-4">
        {recipes.map((r) => (
          <li
            key={r.id}
            className="text-3xl w-full transition-transform hover:translate-x-2 hover:underline mb-10"
          >
            <Link to={"recipe/" + r.slug}>
              {" "}
              <p>{r.name}</p>
              <p className="text-base">{r.cookTime} minutes</p>
            </Link>
          </li>
        ))}
      </ul>
      {/* {error !== "" && <div>Error:{error}</div>} */}
    </section>
  );
};
