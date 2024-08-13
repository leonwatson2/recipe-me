import { FC } from "react";
import { ModifyListItemFunction, Recipe } from "../../types";
import { useUpdateRecipeContext } from "./context";
import { Editable, PlusMinusButtons } from "../utils";

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
            key={`${editing ? index : ing}`}
            className='text-xl mt-3 group-data-[editing="true"]:grid grid-cols-listEditing group-data-[editing="true"]:gap-2'
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
              onPaste={(e) => {
                e.preventDefault();
                const ingredients = e.clipboardData.getData("text").split("\n");
                addIngredient(index, ingredients);
              }}
              placeholder={"Some more cowbell"}
            />
            <PlusMinusButtons
              addFn={addIngredient}
              removeFn={removeIngredient}
              index={index}
              editing={editing}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
