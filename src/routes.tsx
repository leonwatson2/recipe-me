import { ARCHIVE_PATH, RECIPE_PATH, SEARCH_TERM_KEY } from "@utils";
import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  LoaderFunction,
  Navigate,
  Outlet,
  Route,
} from "react-router-dom";
import { useUserContext } from "./components/auth";
import ErrorPage from "./components/ErrorPage";
import { PrivacyPolicy } from "./components/PrivacyPolicy";
import { RecipeListPage } from "./components/RecipeListPage";
import { Root } from "./components/Root";
import { SearchPage } from "./components/SearchPage";
import {
  getArchivedRecipeBySlug,
  getRecipeBySlug,
  searchForRecipe,
} from "./firebase/actions";

const RecipePage = lazy(() =>
  import("./components/RecipePage/RecipePage").then((module) => ({
    default: module.RecipePage,
  })),
);

export const recipeLoader: LoaderFunction<{ slug: string }> = async ({
  params,
}) => {
  if (params.slug) {
    const recipe = await getRecipeBySlug(params.slug);
    return { recipe };
  }
};
export const archiveLoader: LoaderFunction = async ({ params }) => {
  if (params.slug) {
    const recipe = await getArchivedRecipeBySlug(params.slug);
    return { recipe };
  }
};
export const navLinks: { title: string; path: string; isAdmin: boolean }[] = [
  { title: "Recipes", path: "/", isAdmin: false },
  { title: "Archives", path: `/${ARCHIVE_PATH}`, isAdmin: true },
  { title: "New Recipe", path: "/new", isAdmin: true },
];
export const searchLoader: LoaderFunction = async ({ request }) => {
  const searchParams = new URL(request.url);
  const searchTerm = searchParams.searchParams.get(SEARCH_TERM_KEY);
  const recipes = await searchForRecipe(searchTerm || "");
  return recipes;
};

export const ProtectedRoutes = () => {
  const { user } = useUserContext();
  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" errorElement={<ErrorPage />} element={<Root />}>
      <Route index element={<RecipeListPage />} />
      <Route
        path={`${RECIPE_PATH}/:slug`}
        loader={recipeLoader}
        element={<RecipePage />}
      />
      <Route path={ARCHIVE_PATH} element={<RecipeListPage archived />} />
      <Route
        path={`${ARCHIVE_PATH}/recipe/:slug`}
        loader={archiveLoader}
        element={<RecipePage archived />}
      />
      <Route path="search" loader={searchLoader} element={<SearchPage />} />
      <Route path="privacy" element={<PrivacyPolicy />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="new" element={<RecipePage isNew />} />
        <Route path={ARCHIVE_PATH} element={<RecipeListPage archived />} />
        <Route
          path={`${ARCHIVE_PATH}/recipe/:slug`}
          loader={archiveLoader}
          element={<RecipePage archived />}
        />
      </Route>
    </Route>,
  ),
);
