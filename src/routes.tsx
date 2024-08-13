import { createBrowserRouter, LoaderFunction } from "react-router-dom";
import { getAllRecipes, getRecipeBySlug } from "./firebase/actions";
import { RecipePage } from "./components/RecipePage";
import ErrorPage from "./components/ErrorPage";
import { Root } from "./components/Root";
import { RecipeList } from "./components/RecipeList";

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
        element: <RecipeList />,
        loader: async () => {
          const recipes = await getAllRecipes();
          return recipes;
        },
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
        path: "new",
        element: <RecipePage isNew={true} />,
      },
    ],
  },
]);
