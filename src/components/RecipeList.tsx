import "react";
import "../firebase/config.ts";
import { Recipe } from "./RecipePage/types.ts";
import { Link, useLoaderData } from "react-router-dom";
import { SVG } from "../assets/SvgElements.tsx";

export const RecipeList = () => {
  const recipes = useLoaderData() as Array<Recipe>;

  return (
    <section className="mx-auto max-w-7xl relative pt-7">
      <header className="text-7xl font-bold  mb-7">Lastest Recipes</header>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 auto-fill">
        {recipes.map((r) => (
          <li
            key={r.id}
            className="text-3xl w-full transition-transform hover:translate-x-2 hover:underline mb-10"
          >
            <Link to={"recipe/" + r.slug} className="w-full h-full ">
              <div className="bg-brown flex h-54 w-54">
                <SVG className="fill-black" title="smsMonochrome" />
              </div>
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
