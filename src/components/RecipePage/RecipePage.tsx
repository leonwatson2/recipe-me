import { FC, useCallback, useEffect, useRef, useState } from "react";
import "../../firebase/config";
import { getAllRecipes, updateRecipe } from "../../firebase/actions";
import { RecipeTime } from "./RecipeTime";
import { RecipeHeader } from "./RecipeHeader";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeInstructions } from "./RecipeInstructions";
import { UpdateRecipeContext } from "./context";
import { RecipeVideo } from "./RecipeVideo";
import { useEditingRecipe } from "./hooks";
import { SVG } from "../../assets/SvgElements";
import { Recipe } from "../../types";

type RecipePageProps = {};

export const RecipePage: FC<RecipePageProps> = () => {
  const [recipe, setRecipe] = useState<Recipe>();

  const fetchRecipes = useCallback(() => {
    getAllRecipes().then((recipes) => {
      setRecipe(recipes[0]);
    });
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, []);

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
  } = useEditingRecipe(recipe);

  const onConfirmUpdate = useCallback(() => {
    if (editedRecipe && recipe) {
      updateRecipe(editedRecipe).then(() => {
        fetchRecipes();
      });
    }
  }, [editedRecipe, recipe]);

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
          updated={updated}
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
        <main className="flex w-full content-start mt-7 min-w-96">
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
          <RecipeVideo videoUrls={recipe?.videoUrls} />
        </main>
      </div>
    </UpdateRecipeContext.Provider>
  );
};

const EditingBar = () => {
  return (
    <div className='group-data-[editing="true"]:bg-primary group-data-[editing="true"]:h-4 group-data-[editing="true"]:mb-12 top-0 w-full h-0 left-0  ease-in-out duration-200'></div>
  );
};

const EditingButton = ({
  toggleEditing,
  editing,
  updated,
  onConfirmUpdate,
}: {
  toggleEditing: () => void;
  editing: boolean;
  updated: boolean;
  onConfirmUpdate: () => void;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const onCancelClick = () => {
    if (editing && updated) {
      dialogRef.current?.showModal();
    } else {
      toggleEditing();
    }
  };
  const onConfirmClick = async () => {
    await dialogRef.current?.close();
    toggleEditing();
    onConfirmUpdate();
  };
  return (
    <>
      <button className="absolute top-10 right-0" onClick={onCancelClick}>
        <SVG title="swap" height={40} width={40}></SVG>
      </button>
      <dialog ref={dialogRef} className="w-full max-w-7xl bg-brown text-white">
        <div className="w-full h-full grid grid-cols-2 gap-2 p-7">
          <p className="col-span-2 text-3xl py-6 text-center">Save Changes</p>
          <button
            className="bg-black h-16 uppercase"
            onClick={() => {
              toggleEditing();
              dialogRef.current?.close();
            }}
          >
            Cancel
          </button>
          <button className="bg-black h-16 uppercase" onClick={onConfirmClick}>
            Confirm
          </button>
        </div>
      </dialog>
    </>
  );
};
