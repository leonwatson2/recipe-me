import { createBrowserRouter, LoaderFunction } from "react-router-dom";
import { getRecipeBySlug, searchForRecipe } from "./firebase/actions";
import { RecipePage } from "./components/RecipePage";
import ErrorPage from "./components/ErrorPage";
import { Root } from "./components/Root";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { SEARCH_TERM_KEY } from "./components/utils";
import { RecipeListPage } from "./components/RecipeListPage/RecipeListPage";
import { SearchPage } from "./components/SearchPage";

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
        loader: async ({ request  })=> {
          const searchParams = new URL(request.url)
          const searchTerm = searchParams.searchParams.get(SEARCH_TERM_KEY)
          const recipes = await searchForRecipe(searchTerm || '')
          return recipes
        }
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
