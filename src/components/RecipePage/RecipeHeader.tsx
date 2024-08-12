import { FC } from "react";
import { Recipe } from "../../types";
import { Timestamp } from "firebase/firestore";
import { Editable } from "../utils/";
import { useUpdateRecipeContext } from "./context";

type RecipeHeaderProps = Partial<Pick<Recipe, "name" | "intro" | "dateAdded">>;

export const RecipeHeader: FC<RecipeHeaderProps> = ({
  name = `The Best Meal You'll ever have`,
  intro = "",
  dateAdded = { seconds: 0 },
}) => {
  const date = new Timestamp(dateAdded.seconds, 0);
  const { editing, updateEditedRecipe } = useUpdateRecipeContext();
  return (
    <>
      <Editable
        element="h1"
        value={name}
        editing={editing}
        className="text-7xl mb-12"
        placeholder="My dope recipe"
        onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
          updateEditedRecipe("name", e.currentTarget.value);
        }}
      />

      <Editable
        element="p"
        editing={editing}
        className="text-3xl mb-5"
        value={intro}
        placeholder="Something cute to intro this recipe"
        onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
          updateEditedRecipe("intro", e.currentTarget.value);
        }}
      />
      <p className="text-2xl italic opacity-70">
        {" "}
        Updated on {date.toDate().toDateString()}
      </p>
    </>
  );
};
