import { FC } from "react";
import { ModifyListItemFunction, Recipe } from "../../types";
import { Editable, PlusMinusButtons } from "../utils";
import { useUpdateRecipeContext } from "./context";

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
    <section className="preparation min-w-96 max-w-128">
      <header className="font-bold text-4xl">Preparation</header>
      <ol className="instructions mt-6 ml-6 list-outside">
        {(editing ? editedInstruction : instructions).map((ing, index) => {
          return (
            <li
              key={ing + index}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addInstruction(index);
                }
              }}
              className="grid grid-flow-col grid-cols-orderedList justify-start items-start text-xl mt-3 -ml-6 before:w-6 before:font-extrabold before:inline-block before:text-grey before:-ml-6 "
            >
              <Editable
                editing={editing}
                element="div"
                value={ing}
                className="inline-block"
                onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
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
