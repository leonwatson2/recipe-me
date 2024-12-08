import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RecipeListPage } from "../RecipeListPage";
import { createEmptyRecipe, Recipe } from "../../RecipePage/types";
import { createFakeUser, UserContextType, UserContext, User } from "../../auth";
import { createMemoryRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { formatMinutes } from "@utils";

const renderWithProviders = (
  element: JSX.Element,
  { context }: { context: Partial<UserContextType> } = { context: {} },
) => {
  const userContext: UserContextType = {
    user: createFakeUser(),
    googleUser: undefined,
    loggedIn: false,
    loadingUser: false,
    login: () => { },
    logout: () => { },
    ...context,
  };
  return render(
    <UserContext.Provider value={userContext}>{element}</UserContext.Provider>,
  );
};
const recipes: Array<Recipe> = [...new Array(20)].map((_, i) => createEmptyRecipe({
  id: "test-recipe-" + i,
  name: "Test Recipe Name " + i,
  ingredients: ["Test Ingredient", "Test Ingredient 2", "Test Ingredient 3"],
  instructions: ["Test Instruction", "Test Instruction 2"],
  intro: "Test Intro",
  cookTime: 10 + i * 2,
  prepTime: 33 + i * 3,

  slug: "test-recipe",
}));

vi.mock("../../../firebase/actions", (originalImport) => ({
  ...originalImport,
  getAllRecipes: vi.fn(() => Promise.resolve({ recipes, lastRecipeDoc: undefined }))
}));

const routes = [
  {
    path: "/",
    element: <RecipeListPage />,
  },
  {
    path: "/archives",
    element: <RecipeListPage archived={true} />,
  },
];

test("should render list of recipes and cook times", async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    initialIndex: 0,
  });
  const user: User = createFakeUser({ isAdmin: false });
  renderWithProviders(<RouterProvider router={router} />, { context: { user } });
  await screen.findByText("Test Recipe Name 0")
  for(let i = 0; i < recipes.length; i++){
    expect(screen.getByText("Test Recipe Name " + i)).toBeTruthy();
    expect(screen.getByText(formatMinutes(recipes[i].cookTime+recipes[i].prepTime))).toBeTruthy()
  }
});
