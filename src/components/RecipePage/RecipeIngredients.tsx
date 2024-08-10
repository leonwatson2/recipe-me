import { FC } from "react";
import { ModifyListItemFunction, Recipe } from "../../types";
import { useUpdateRecipeContext } from "./context";
import { Editable } from "../utils";

type RecipeIngredientsProps = {
  editedIngredients?: Recipe["ingredients"];
  ingredients?: Recipe["ingredients"];
  removeIngredient: ModifyListItemFunction;
  addIngredient: ModifyListItemFunction;
};
export const RecipeIngredients: FC<RecipeIngredientsProps> = ({
  ingredients = [],
  editedIngredients = [],
  addIngredient,
  removeIngredient,
}) => {
  const { editing, updateEditedRecipe } = useUpdateRecipeContext();
  return (
    <section className="ingredients min-w-96 max-w-128 mr-10">
      <header className="font-bold text-4xl">Ingredients</header>
      <ul className="mt-6">
        {(editing ? editedIngredients : ingredients).map((ing, index) => (
          <li
            key={`${ing}`}
            className="text-xl mt-3"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addIngredient(index);
              }
            }}
          >
            <Editable
              editing={editing}
              element="div"
              value={ing}
              className="inline-block"
              onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
                updateEditedRecipe(
                  "ingredients",
                  [e.currentTarget.value],
                  index,
                );
              }}
              onKeyUp={handleListRemove(removeIngredient, index)}
              placeholder={"Some more cowbell"}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export const handleListRemove =
  (removeFunction: ModifyListItemFunction, index: number) =>
  (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.currentTarget.value === "") {
      if (e.key === "Delete") {
        e.preventDefault();
        (
          e.currentTarget.parentNode?.previousSibling?.firstChild as HTMLElement
        )?.focus();
        removeFunction(index);
      }
    } else if (e.key === "Enter") {
      (
        e.currentTarget.parentNode?.nextSibling?.firstChild as HTMLElement
      )?.focus();
    }
  };
