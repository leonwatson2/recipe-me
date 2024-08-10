import { FC, useEffect, useState } from "react";
import "../../firebase/config";
import { getAllRecipes } from "../../firebase/actions";
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

  useEffect(() => {
    getAllRecipes().then((recipes) => {
      setRecipe(recipes[0]);
      setEditedRecipe(recipe);
    });
  }, []);

  const {
    editing,
    editedRecipe,
    toggleEditing,
    setEditedRecipe,
    addInstruction,
    addIngredient,
    removeIngredient,
    removeInstruction,
    updateEditedRecipe,
  } = useEditingRecipe(recipe);

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
        <EditingButton toggleEditing={toggleEditing} />
        <RecipeHeader
          dateAdded={recipe?.dateAdded}
          intro={recipe?.intro}
          name={recipe?.name}
        />
        <RecipeTime
          cookTime={recipe?.cookTime || 0}
          prepTime={recipe?.prepTime || 0}
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

const EditingButton = ({ toggleEditing }: { toggleEditing: () => void }) => {
  return (
    <button className="absolute top-10 right-0" onClick={toggleEditing}>
      <SVG title="swap" height={40} width={40}></SVG>
    </button>
  );
};
