import { useCallback, useEffect, useMemo, useState } from "react";
import { useToggle } from "../../utils";
import {
  EditingRecipe,
  ModifyListItemFunction,
  Recipe,
  RemoveItemFunction,
} from "../../types";
import { deepEqual, isArray } from "../utils";

export type UpdateRecipeType = <
  T extends keyof EditingRecipe,
  K extends EditingRecipe[T],
>(
  property: T,
  value: [K] | K,
  index?: number,
) => void;

export const useEditingRecipe = ({
  recipe,
  isNew = false,
}: {
  recipe?: Recipe;
  isNew?: boolean;
}) => {
  const [editing, toggleEditing] = useToggle(isNew);
  const [editedRecipe, setEditedRecipe] = useState<EditingRecipe>();

  useEffect(() => {
    if (isNew) {
      toggleEditing(true);
    } else {
      toggleEditing(false);
    }
  }, [isNew]);

  useEffect(() => {
    if (editing && recipe) {
      setEditedRecipe({ ...recipe, photoUploads: [] });
    }
  }, [editing, setEditedRecipe, recipe]);

  const updated = useMemo(() => {
    if (editedRecipe === undefined) return false;
    const { photoUploads, ...edR } = editedRecipe;
    return (
      !isSameRecipe(recipe, edR) ||
      (editedRecipe &&
        editedRecipe.photoUploads &&
        editedRecipe?.photoUploads?.length > 0)
    );
  }, [editedRecipe, recipe]);

  const updateEditedRecipe: UpdateRecipeType = useCallback(
    (property, value, index) => {
      setEditedRecipe((oldR) => {
        if (oldR === undefined) return oldR;
        const isArrayProperty = isArray(value) && isArray(oldR[property]);
        if (!isArrayProperty) {
          return {
            ...oldR,
            [property]:
              typeof value === "string" ? value.replace("\n", "") : value,
          };
        }
        if (property === "photoUploads" && isArray(oldR[property])) {
          return {
            ...oldR,
            [property]: [...oldR[property], ...value],
          };
        }
        if (isArray(oldR[property]) && isArray(value)) {
          if (index === undefined)
            throw new Error(
              "No index was passed for array property: " + property,
            );
          const newArray = [...oldR[property]];
          newArray[index] = value[0];
          return {
            ...oldR,
            [property]: newArray,
          };
        }
      });
    },
    [editedRecipe],
  );
  const removeItem: RemoveItemFunction = (property, index) => {
    setEditedRecipe((oldR) => {
      if (oldR === undefined) return;
      if (!isArray(oldR[property])) return;
      const newItems = Array.from(oldR[property]);
      newItems.splice(index, 1);
      return {
        ...oldR,
        [property]: newItems,
      };
    });
  };
  const addInstruction: ModifyListItemFunction = (index: number, items) => {
    setEditedRecipe((oldR) => {
      if (oldR === undefined) return undefined;
      const newInstructions = [...(oldR?.instructions || [])];
      if (items && items?.length > 0) {
        newInstructions[index] = items[0];
        items.shift();
        return {
          ...oldR,
          instructions: newInstructions.concat(items),
        };
      }
      newInstructions.splice(index + 1, 0, "");
      for (let i = 0, foundEmpty = false; i < newInstructions.length; i++) {
        if (foundEmpty && newInstructions[i] === "")
          newInstructions.splice(i, 1);
        if (newInstructions[i] === "") foundEmpty = true;
      }

      return {
        ...oldR,
        instructions: newInstructions,
      };
    });
  };

  const addIngredient: ModifyListItemFunction = (index: number, items = []) => {
    setEditedRecipe((oldR) => {
      if (oldR === undefined) return undefined;
      const newIngredients = [...(oldR?.ingredients || [])];
      if (newIngredients[index + 1] === "") return oldR;
      if (items && items?.length > 0) {
        newIngredients[index] = items[0];
        items.shift();
        return {
          ...oldR,
          ingredients: newIngredients.concat(items),
        };
      }
      newIngredients.splice(index + 1, 0, "");

      for (let i = 0, foundEmpty = false; i < newIngredients.length; i++) {
        if (foundEmpty && newIngredients[i] === "") newIngredients.splice(i, 1);
        if (newIngredients[i] === "") foundEmpty = true;
      }

      return {
        ...oldR,
        ingredients: newIngredients,
      };
    });
  };
  const removeIngredient = (index: number) => {
    setEditedRecipe((oldR) => {
      if (oldR === undefined) return undefined;
      const newIngredients = [...(oldR?.ingredients || [])];
      newIngredients.splice(index, 1);
      if (newIngredients.length === 0) return oldR;
      return {
        ...oldR,
        ingredients: newIngredients,
      };
    });
  };
  const removeInstruction: ModifyListItemFunction = (index: number) => {
    setEditedRecipe((oldR) => {
      if (oldR === undefined) return undefined;
      const newInstructions = [...(oldR?.instructions || [])];
      newInstructions.splice(index, 1);
      if (newInstructions.length === 0) return oldR;
      return {
        ...oldR,
        instructions: newInstructions,
      };
    });
  };

  return {
    editing,
    updated,
    removeItem,
    editedRecipe,
    toggleEditing,
    addInstruction,
    addIngredient,
    updateEditedRecipe,
    removeIngredient,
    removeInstruction,
  };
};

const isSameRecipe = (recipe1?: Recipe, recipe2?: Recipe) => {
  if (recipe1 === undefined || recipe2 === undefined) return false;
  return deepEqual(recipe1, recipe2);
};
