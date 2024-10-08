import { FC } from "react";
import { useUpdateRecipeContext } from "./context";
import { Editable } from "../../utils/components";

type RecipeTimeProps = {
  prepTime: number;
  cookTime: number;
  editedPrepTime: number;
  editedCookTime: number;
};

export const RecipeTime: FC<RecipeTimeProps> = ({
  prepTime,
  cookTime,
  editedPrepTime,
  editedCookTime,
}) => {
  const { editing, updateEditedRecipe } = useUpdateRecipeContext();

  return (
    <div className="time-section md:flex mt-5">
      <div className="border-r-2 border-primary border-opacity-60 pr-4">
        <header className="md:text-sm font-bold ">Total Time</header>
        {editing ? (
          <p>{editedPrepTime + editedCookTime} Minutes</p>
        ) : (
          <p>{prepTime + cookTime} Minutes</p>
        )}
      </div>
      <div className=" text-lg md:text-base border-r-2 border-primary border-opacity-60 md:pl-4 pr-4">
        <header className="md:text-sm font-bold">Prep Time</header>

        <p className="flex">
          <Editable
            className={"w-12"}
            editing={editing}
            element="i"
            inputMode="numeric"
            value={editing ? editedPrepTime : prepTime}
            onChange={(e) => {
              updateEditedRecipe("prepTime", +e.currentTarget.value);
            }}
          />{" "}
          Minutes
        </p>
      </div>
      <div className=" text-lg md:text-base md:pl-4 pr-4">
        <header className="md:text-sm font-bold">Cook Time</header>
        <p className="flex">
          <Editable
            className={"w-12"}
            editing={editing}
            element="i"
            value={editing ? editedCookTime : cookTime}
            onChange={(e) => {
              updateEditedRecipe("cookTime", +e.currentTarget.value);
            }}
          />{" "}
          Minutes
        </p>
      </div>
    </div>
  );
};
