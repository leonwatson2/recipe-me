import { useTitle } from "@utils";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { UpdateRecipeContext } from "./context";
import { useEditingRecipe } from "./hooks";
import { RecipeBody } from "./RecipeBody";
import { createEmptyRecipe } from "./types";
import { addRecipe } from "../../firebase/actions";

const recipe = createEmptyRecipe();

export const NewRecipePage: FC = () => {
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
  } = useEditingRecipe({ recipe, isNew: true });
  const onConfirmUpdate = () => {
    if (editedRecipe) {
      addRecipe(editedRecipe).then((slug) => {
        navigate(`/recipe/${slug}`);
      });
    }
  };
  useTitle(`New Recipe`);
  return (
    <UpdateRecipeContext.Provider
      value={{
        editing,
        updateEditedRecipe,
      }}
    >
      <RecipeBody
        recipe={recipe}
        isNew={true}
        revalidating={false}
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
        archived={false}
      />
    </UpdateRecipeContext.Provider>
  );
};
