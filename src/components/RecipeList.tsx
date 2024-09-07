import "react";
import "../firebase/config.ts";
import { Link } from "react-router-dom";
import { SVG } from "../assets/SvgElements.tsx";
import { Button } from "@Utils";
import { FC } from "react";
import { Recipe } from "./RecipePage/types.ts";
import { motion } from "framer-motion";
type RecipeListProps = {
  recipes: Array<Recipe>;
  title: string;
  recievedAll?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
};
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const listItem = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};
export const RecipeList: FC<RecipeListProps> = ({
  title,
  recipes,
  recievedAll = true,
  loading = false,
  onLoadMore = () => { },
}) => {
  return (
    <section className="mx-auto max-w-7xl min-h-[80vh] flex flex-col relative pt-7">
      <header className="text-7xl font-bold w-full  mb-7">
        <h2>
          {!loading && recievedAll && recipes.length === 0
            ? "No Recipes"
            : title}
        </h2>
      </header>
      {recipes.length !== 0 && (
        <motion.ul
          variants={container}
          initial={"hidden"}
          animate={"show"}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 auto-fill"
        >
          {recipes.map((r) => (
            <motion.li
              variants={listItem}
              key={r.id}
              className="text-3xl w-full transition-transform hover:translate-x-2 hover:underline mb-10"
            >
              <Link to={"/recipe/" + r.slug} className="w-full h-full ">
                <div className="bg-brown flex h-54 w-54">
                  <SVG className="fill-black" title="smsMonochrome" />
                </div>
                <p>{r.name}</p>
                <p className="text-base">{r.cookTime} minutes</p>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      )}

      {!loading && (
        <Button
          className="mx-auto w-60 max-w-full bg-brown"
          hidden={recievedAll}
          onClick={onLoadMore}
        >
          Load More
        </Button>
      )}
      {loading && (
        <SVG title="replay" className="animate-spin fill-primary" />
      )}
      {/* {error !== "" && <div>Error:{error}</div>} */}
    </section>
  );
};
