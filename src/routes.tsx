import { createBrowserRouter, LoaderFunction } from "react-router-dom";
import { getRecipeBySlug, searchForRecipe } from "./firebase/actions";
import ErrorPage from "./components/ErrorPage";
import { Root } from "./components/Root";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { RecipeListPage } from "./components/RecipeListPage/RecipeListPage";
import { SearchPage } from "./components/SearchPage";
import { SEARCH_TERM_KEY } from "@utils";
import { lazy } from "react";

const RecipePage = lazy(() => import("./components/RecipePage/RecipePage").then((module) => ({ default: module.RecipePage })));
export const recipeLoader: LoaderFunction<{ slug: string }> = async ({
  params,
}) => {
  if (params.slug) {
    const recipe = await getRecipeBySlug(params.slug);
    return { recipe };
  }
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <RecipeListPage />,
      },
      {
        path: "recipe/:slug",
        element: <RecipePage />,
        loader: async ({ params }) => {
          if (params.slug) {
            const recipe = await getRecipeBySlug(params.slug);

            return { recipe };
          }
        },
      },
      {
        path: "search",
        element: <SearchPage />,
        loader: async ({ request }) => {
          const searchParams = new URL(request.url);
          const searchTerm = searchParams.searchParams.get(SEARCH_TERM_KEY);
          const recipes = await searchForRecipe(searchTerm || "");
          return recipes;
        },
      },
      {
        path: "new",
        element: <RecipePage isNew={true} />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />,
      },
    ],
  },
]);
