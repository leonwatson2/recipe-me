import { lazy } from "react";
import { createBrowserRouter, LoaderFunction } from "react-router-dom";
import { getArchivedRecipeBySlug, getRecipeBySlug, searchForRecipe } from "./firebase/actions";
import ErrorPage from "./components/ErrorPage";
import { Root } from "./components/Root";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { RecipeListPage } from "./components/RecipeListPage";
import { SearchPage } from "./components/SearchPage";
import { SEARCH_TERM_KEY, RECIPE_PATH, ARCHIVE_PATH } from "@utils";

const RecipePage = lazy(() => import("./components/RecipePage/RecipePage").then((module) => ({ default: module.RecipePage })));

export const recipeLoader: LoaderFunction<{ slug: string }> = async ({
  params,
}) => {
  if (params.slug) {
    const recipe = await getRecipeBySlug(params.slug);
    return { recipe };
  }
};

export const adminLinks: { title: string, path: string }[] = [
  { title: "Archives", path: `/${ARCHIVE_PATH}` },
  { title: "New Recipe", path: "/new" },
];
export const publicLinks = [
  { title: "Recipes", path: "/" },
];
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
        path: `${RECIPE_PATH}/:slug`,
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
  {
    path: `/${ARCHIVE_PATH}`,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <RecipeListPage archived={true} />,
      },
      {
        path: `recipe/:slug`,
        element: <RecipePage archived={true} />,
        loader: async ({ params }) => {
          if (params.slug) {
            const recipe = await getArchivedRecipeBySlug(params.slug);

            return { recipe };
          }
        },
      }
    ]
  }
]);
