import { FC } from "react";
import { ModifyListItemFunction, Recipe } from "./types";
import { useUpdateRecipeContext } from "./context";
import { PlusMinusButtons } from "../utils";
import { Editable } from "../utils/components";

type RecipeInstructionsProps = {
  instructions?: Recipe["instructions"];
  editedInstruction?: Recipe["instructions"];
  addInstruction: ModifyListItemFunction;
  removeInstruction: ModifyListItemFunction;
};
export const RecipeInstructions: FC<RecipeInstructionsProps> = ({
  instructions = [],
  editedInstruction = [],
  addInstruction,
  removeInstruction,
}) => {
  const { updateEditedRecipe, editing } = useUpdateRecipeContext();
  return (
    <section className="preparation mt-7  md:ml-4 md:mt-0">
      <header className="font-bold text-2xl uppercase"><h2>Preparation</h2></header>
      <ol className="instructions mt-6 ml-6">
        {(editing ? editedInstruction : instructions).map((ing, index) => {
          return (
            <li
              key={index}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addInstruction(index);
                }
              }}
              className="grid grid-flow-col grid-cols-orderedList justify-start items-start text-xl mt-3 before:w-6 before:font-extrabold before:inline-block before:text-grey before:-ml-6 "
            >
              <Editable
                editing={editing}
                element="div"
                value={ing}
                className="inline-block"
                onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
                  if(e.currentTarget.value === ing) return;
                  updateEditedRecipe(
                    "instructions",
                    [e.currentTarget.value],
                    index,
                  );
                }}
                onPaste={(e) => {
                  e.preventDefault();
                  const instructions = e.clipboardData
                    .getData("text")
                    .split("\n");
                  addInstruction(index, instructions);
                }}
                placeholder="Then you put the lime in the coconut"
              />
              <PlusMinusButtons
                addFn={addInstruction}
                removeFn={removeInstruction}
                editing={editing}
                index={index}
              />
            </li>
          );
        })}
      </ol>
    </section>
  );
};
