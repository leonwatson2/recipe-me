import { FC, useCallback, useMemo } from "react";
import "../../firebase/config";
import { addRecipe, updateRecipe } from "../../firebase/actions";
import { RecipeTime } from "./RecipeTime";
import { RecipeHeader } from "./RecipeHeader";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeInstructions } from "./RecipeInstructions";
import { UpdateRecipeContext } from "./context";
import { RecipeVideo } from "./RecipeVideo";
import { useEditingRecipe } from "./hooks";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { createEmptyRecipe, isRecipe } from "./types";
import { useUserContext } from "../auth";
import { EditingButton } from "./EditingButton";
import { useProtectedRoute, useTitle } from "../utils";

type RecipePageProps = {
  isNew?: boolean;
};

export const RecipePage: FC<RecipePageProps> = ({ isNew = false }) => {
  const data = useLoaderData() as { recipe: unknown };
  const revalidator = useRevalidator();
  const { user } = useUserContext();
  const recipe = useMemo(
    () =>
      isRecipe(data?.recipe) && !isNew ? data.recipe : createEmptyRecipe(),
    [isNew, data],
  );
  useTitle(isNew ? `New Recipe` :`Recipe: ${recipe.name}`)

  const canSeePage = useMemo(() => {
    if (!isNew) return true;
    if (isNew && !!user?.isAdmin) return true;
    return false;
  }, [user, isNew]);
  useProtectedRoute(canSeePage);
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
  } = useEditingRecipe({ recipe, isNew });

  const onConfirmUpdate = useCallback(() => {
    if (isNew && editedRecipe) {
      addRecipe(editedRecipe).then((slug) => {
        navigate(`/recipe/${slug}`);
      });
    } else if (editedRecipe && recipe) {
      updateRecipe(editedRecipe).then(() => {
        revalidator.revalidate();
      });
    }
  }, [editedRecipe, recipe, isNew, navigate, revalidator]);

  return (
    <UpdateRecipeContext.Provider
      value={{
        editing,
        updateEditedRecipe,
      }}
    >
      <div
        data-editing={editing}
        className="group recipe-page mx-auto max-w-7xl relative"
      >
        <EditingBar />
        <EditingButton
          toggleEditing={toggleEditing}
          editing={editing}
          updated={updated || false}
          isNew={isNew}
          onConfirmUpdate={onConfirmUpdate}
        />
        <RecipeHeader
          dateAdded={recipe?.dateAdded}
          intro={recipe?.intro}
          name={recipe?.name}
        />
        <RecipeTime
          cookTime={recipe?.cookTime || 0}
          prepTime={recipe?.prepTime || 0}
          editedCookTime={editedRecipe?.cookTime || 0}
          editedPrepTime={editedRecipe?.prepTime || 0}
        />
        <main className="md:grid content-start items-start mt-7 sm:min-w-96  md:auto-fill-96 grid-cols-1">
          <RecipeIngredients
            ingredients={recipe?.ingredients}
            editedIngredients={editedRecipe?.ingredients}
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
          />
          <RecipeInstructions
            instructions={recipe?.instructions}
            editedInstruction={editedRecipe?.instructions}
            addInstruction={addInstruction}
            removeInstruction={removeInstruction}
          />
          <RecipeVideo
            photoUploads={editedRecipe?.photoUploads}
            photoUrls={recipe?.photoUrls}
            removeItem={removeItem}
          />
        </main>
      </div>
    </UpdateRecipeContext.Provider>
  );
};

const EditingBar = () => {
  return (
    <div className='group-data-[editing="true"]:bg-primary group-data-[editing="true"]:h-4 top-0 w-full h-0 left-0  ease-in-out duration-200'></div>
  );
};
