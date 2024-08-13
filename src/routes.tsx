import { createBrowserRouter, LoaderFunction } from "react-router-dom";
import { getAllRecipes, getRecipeBySlug } from "./firebase/actions";
import { RecipePage } from "./components/RecipePage";
import ErrorPage from "./components/ErrorPage";

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
    element: <RecipePage />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const recipes = await getAllRecipes();
      return { recipe: recipes[0] };
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
]);
