import { FC } from "react";
import { Recipe } from "./types";

type RecipeSeachTermsProps = {
  searchTerms: Recipe["searchTerms"];
  editing: boolean;
};

export const RecipeSearchTerms: FC<RecipeSeachTermsProps> = ({
  searchTerms = [],
}) => {
  return (
    <ul className="flex gap-4 flex-wrap mt-7">
      {searchTerms.map((t) => (
        <li className="rounded-3xl min-w-16 text-center bg-lbrown p-2" key={t}>{t}</li>
      ))}
    </ul>
  );
};
