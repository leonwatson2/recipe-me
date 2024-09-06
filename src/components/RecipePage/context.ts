import { createContext, useContext } from "react";
import { UpdateRecipeType } from "./hooks/useEditingRecipe";

type UpdateRecipeContextType = {
  updateEditedRecipe: UpdateRecipeType;
  editing: boolean;
};

const defaultUpdateRecipeContext: UpdateRecipeContextType = {
  updateEditedRecipe: () => {},
  editing: false,
};

export const UpdateRecipeContext = createContext<UpdateRecipeContextType>(
  defaultUpdateRecipeContext,
);

export const useUpdateRecipeContext = () => {
  const context = useContext(UpdateRecipeContext);
  return context;
};
