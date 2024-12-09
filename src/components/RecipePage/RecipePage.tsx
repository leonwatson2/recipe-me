import { FC, useCallback, useMemo } from "react";
import "../../firebase/config";
import { updateRecipe } from "../../firebase/actions";
import { UpdateRecipeContext } from "./context";
import { useEditingRecipe } from "./hooks";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { Recipe } from "./types";
import { useTitle } from "../../utils";
import { RecipeBody } from "./RecipeBody";

type RecipePageProps = {
  archived?: boolean;
};

export const RecipePage: FC<RecipePageProps> = ({
  archived = false,
}) => {
  const data = useLoaderData() as { recipe: Recipe };
  const revalidator = useRevalidator();
  const recipe = useMemo(
    () =>
      data.recipe,
    [data],
  );
  useTitle(recipe ? `Recipe: ${recipe.name}`: "Recipe");

  const navigate = useNavigate();

  const {
    editing,
    updated,
    editedRecipe,
    toggleEditing,
    addInstruction,
    addIngredient,
    removeIngredient,
    removeInstruction,
    updateEditedRecipe,
    removeItem,
  } = useEditingRecipe({ recipe, isNew:false });

  const onConfirmUpdate = useCallback(() => {
    if (editedRecipe && recipe) {
      updateRecipe(editedRecipe).then(() => {
        revalidator.revalidate();
      });
    }
  }, [editedRecipe, recipe, navigate, revalidator]);

  return (
    <UpdateRecipeContext.Provider
      value={{
        editing,
        updateEditedRecipe,
      }}
    >
    <RecipeBody 
      recipe={recipe}
      revalidating={revalidator.state === "loading"}
      editing={editing}
      updated={updated}
      editedRecipe={editedRecipe}
      toggleEditing={toggleEditing}
      addInstruction={addInstruction}
      addIngredient={addIngredient}
      removeIngredient={removeIngredient}
      removeInstruction={removeInstruction}
      removeItem={removeItem}
      onConfirmUpdate={onConfirmUpdate}
      archived={archived}
    />
    </UpdateRecipeContext.Provider>
  );
};



