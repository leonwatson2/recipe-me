import { FC } from "react";
import { RecipeTime } from "./RecipeTime";
import { RecipeHeader } from "./RecipeHeader";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeInstructions } from "./RecipeInstructions";
import { RecipeImage } from "./RecipeImage";
import { EditingButton } from "./EditingButton";
import { RecipeDelete } from "./RecipeDelete";
import { useUserContext } from "../auth";
import { Recipe } from "./types";
import { useEditingRecipeType } from "./hooks/useEditingRecipe";

type RecipeBodyProps = {
  recipe: Recipe;
  revalidating: boolean;
  archived?: boolean;
  onConfirmUpdate: () => void;
  isNew?: boolean;
} & Omit<useEditingRecipeType, "updateEditedRecipe">;

export const RecipeBody: FC<RecipeBodyProps> = ({
  archived = false,
  isNew = false,
  revalidating,
  recipe,
  editing,
  updated,
  editedRecipe,
  toggleEditing,
  addInstruction,
  addIngredient,
  removeIngredient,
  removeInstruction,
  removeItem,
  onConfirmUpdate,
}) => {
  const { user } = useUserContext();
  return (
    <div
      data-testid="recipe-page"
      data-editing={editing}
      className={
        "group recipe-page mx-auto max-w-7xl relative min-h-[calc(100vh-4rem)] transition " +
        (revalidating ? "opacity-55" : "opacity-100")
      }
    >
      <EditingBar />
      {user?.isAdmin && !archived && (
        <EditingButton
          toggleEditing={toggleEditing}
          editing={editing}
          updated={updated || false}
          isNew={isNew}
          onConfirmUpdate={onConfirmUpdate}
        />
      )}
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
        <RecipeImage
          photoUploads={editedRecipe?.photoUploads}
          photoUrls={recipe?.photoUrls}
          removeItem={removeItem}
        />
        {user?.isAdmin && !isNew ? (
          <RecipeDelete archived={archived} editing={editing} recipe={recipe} />
        ) : null}
      </main>
    </div>
  );
};

const EditingBar = () => {
  return (
    <div className='group-data-[editing="true"]:bg-primary group-data-[editing="true"]:h-4 top-0 w-full h-0 left-0  ease-in-out duration-200'></div>
  );
};
