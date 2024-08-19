import { FC, useCallback, useMemo, useRef } from "react";
import "../../firebase/config";
import { addRecipe, updateRecipe } from "../../firebase/actions";
import { RecipeTime } from "./RecipeTime";
import { RecipeHeader } from "./RecipeHeader";
import { RecipeIngredients } from "./RecipeIngredients";
import { RecipeInstructions } from "./RecipeInstructions";
import { UpdateRecipeContext } from "./context";
import { RecipeVideo } from "./RecipeVideo";
import { useEditingRecipe } from "./hooks";
import { SVG } from "../../assets/SvgElements";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { createEmptyRecipe, isRecipe } from "../../types";
import { DialogBox } from "../utils/DialogBox";

type RecipePageProps = {
  isNew?: boolean;
};

export const RecipePage: FC<RecipePageProps> = ({ isNew = false }) => {
  const data = useLoaderData() as { recipe: unknown };
  const revalidator = useRevalidator();
  const recipe = useMemo(
    () =>
      isRecipe(data?.recipe) && !isNew ? data.recipe : createEmptyRecipe(),
    [isNew, data],
  );

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
          updated={updated}
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
        <main className="grid content-start mt-7 sm:min-w-96  md:auto-fill-96 grid-cols-1">
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
    <div className='group-data-[editing="true"]:bg-primary group-data-[editing="true"]:h-4 top-0 w-full h-0 left-0  ease-in-out duration-200'></div>
  );
};

type EditingButtonProps = {
  toggleEditing: () => void;
  editing: boolean;
  updated: boolean;
  isNew: boolean;
  onConfirmUpdate: () => void;
};
const EditingButton = ({
  isNew,
  editing,
  updated,
  toggleEditing,
  onConfirmUpdate,
}: EditingButtonProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const editButtonClick = () => {
    if (isNew && !updated) return;
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
      <button
        className="absolute top-10 right-0"
        tabIndex={1}
        onClick={editButtonClick}
      >
        {isNew && (
          <SVG
            title="checkmark"
            className={
              "transition-opacity duration-300 " +
              (updated ? "opacity-100" : "opacity-0 cursor-default")
            }
            tabIndex={updated ? 0 : -1}
            height={40}
            width={40}
          ></SVG>
        )}
        {!isNew && (
          <SVG
            className={`absolute right-10 transition-opacity duration-300 
            ${editing ? "opacity-100" : "opacity-0 cursor-default"}`}
            title="checkmark"
            tabIndex={editing ? 0 : -1}
            height={40}
            width={40}
          ></SVG>
        )}

        <SVG
          title="arrow-down"
          svgClassName="fill-brown"
          className={`absolute right-10 transition-opacity duration-300 
            ${editing ? "opacity-0 cursor-default" : "opacity-100"}`}
          tabIndex={editing ? -1 : 0}
          height={40}
          width={40}
        ></SVG>
      </button>
      <DialogBox
        title={"Save Changes"}
        className="grid grid-cols-2 gap-2 p-7"
        ref={dialogRef}
      >
        <button
          className="bg-black h-16 uppercase"
          onClick={() => {
            if (!isNew) toggleEditing();
            dialogRef.current?.close();
          }}
        >
          Cancel
        </button>
        <button className="bg-black h-16 uppercase" onClick={onConfirmClick}>
          Confirm
        </button>
      </DialogBox>
    </>
  );
};
