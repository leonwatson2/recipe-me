import { Button, DialogBox, Editable } from "@utils";
import { useRef, useState } from "react";
import { FC } from "react";
import { archiveRecipe } from "../../firebase/actions";
import { Recipe } from "./types";
import { useDialogContext } from "@utils/contexts/dialog-context";

type RecipeDeleteProps = {
  recipe: Recipe;
  editing: boolean;
  navigate: (path: string) => void;
};
export const RecipeDelete: FC<RecipeDeleteProps> = ({ editing, recipe, navigate }) => {

  const dialoagRef = useRef<HTMLDialogElement>(null);
  const [recipeText, setRecipeText] = useState<string>("");
  const { setDialogOpen } = useDialogContext()
  if (!editing) return null;
  return (
    <section className="delete-section">
      <Button
        onClick={() => {
          dialoagRef.current?.showModal();
          setDialogOpen(true);
        }
        }
        className="text-red-500"
      >
        Delete Recipe
      </Button>
      <DialogBox title="Delete Recipe" className="grid grid-cols-2 gap-2" ref={dialoagRef}>
        <p className="col-span-2 text-center">Type name to delete</p>
        <label htmlFor="recipeName" >Recipe Name: <i>{recipe.name}</i></label>
        <Editable element="p"
          id="recipeName"
          className="p-2 h-full col-span-2"
          editing={true}
          placeholder={recipe.name}
          value={recipeText}
          onKeyUp={(e) => { setRecipeText(e.currentTarget.value) }}
        />
        <Button
          className="bg-red-500 text-white disabled:bg-lbrown"
          disabled={recipeText !== recipe.name}
          onClick={() => {
            if (recipe) {
              archiveRecipe(recipe.id).then(() => {
                dialoagRef.current?.close();
                setDialogOpen(false);
                navigate("/");
              });
            }
          }}
        >
          Confirm

        </Button>
        <Button
          onClick={() => {
            dialoagRef.current?.close();
            setDialogOpen(false);
          }}
        >
          Cancel
        </Button>
      </DialogBox>
    </section>
  )
}
