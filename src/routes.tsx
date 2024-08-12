import { createBrowserRouter, LoaderFunction } from "react-router-dom";
import { getRecipeBySlug } from "./firebase/actions";
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
    children: [
      {
        path: "/new",
        element: <RecipePage isNew={true} />,
      },
      {
        path: "/:slug",
        element: <RecipePage />,
        loader: recipeLoader,
      },
    ],
  },
]);
