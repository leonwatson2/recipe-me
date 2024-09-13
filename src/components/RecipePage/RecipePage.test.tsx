import { test, expect } from "vitest";
import { RecipePage } from "./RecipePage";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { createEmptyRecipe, Recipe } from "./types";
import { UserContext, UserContextType } from "../auth";
import { createFakeUser, User } from "../auth/types";
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
const recipe: Recipe = createEmptyRecipe({
  name: "Test Recipe Name",
  ingredients: ["Test Ingredient"],
  instructions: ["Test Instruction"],
  intro: "Test Intro",
  cookTime: 10,
  prepTime: 33,

  slug: "test-recipe",
});
const routes = [
  {
    path: "/",
    element: <RecipePage />,
    loader: async () => {
      return { recipe };
    },
  },
  {
    path: "/new",
    element: <RecipePage isNew={true} />,
  }
];

const testIds = {
  recipePage: "recipe-page",
  editButton: "edit-button",
  name: "input-recipe-name",
};

test("renders recipe page", async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    initialIndex: 0,
  });
  renderWithProviders(<RouterProvider router={router} />);

  await screen.findByTestId(testIds.recipePage);
  expect(screen.getByText(recipe.name)).toBeInTheDocument();
  expect(screen.getByText(recipe.ingredients[0])).toBeInTheDocument();
  expect(screen.getByText(recipe.instructions[0])).toBeInTheDocument();
  expect(screen.getByText(recipe.intro)).toBeInTheDocument();
  // Edit button should not be present if user is not logged in
  expect(screen.queryByTestId("edit-button")).not.toBeInTheDocument();
});

test("renders edit button if user is logged in", async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    initialIndex: 0,
  });
  const user: User = createFakeUser({ isAdmin: true });
  renderWithProviders(<RouterProvider router={router} />, {
    context: { user, loggedIn: true },
  });
  expect(await screen.findByTestId("edit-button")).toBeInTheDocument();
});

test("admin user can edit recipe", async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
    initialIndex: 0,
  });
  const user: User = createFakeUser({ isAdmin: true });
  renderWithProviders(<RouterProvider router={router} />, {
    context: { user, loggedIn: true },
  });
  await screen.findByTestId(testIds.recipePage);
  expect(screen.getByText(recipe.name)).toBeInTheDocument();

  const editButton = screen.getByTestId(testIds.editButton);
  expect(editButton).toBeInTheDocument();

  editButton.click();

  await waitFor(() => {
    expect(screen.getByTestId(testIds.name)).toBeInTheDocument();
  });
  const nameInput: HTMLTextAreaElement = screen.getByTestId(testIds.name);
  nameInput.focus();
  expect(nameInput.value).toBe(recipe.name);
});


test("non-admin user create a new recipe and is redirected to home page", async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/new"],
    initialIndex: 0,
  });
  const user: User = createFakeUser({ isAdmin: false });
  renderWithProviders(<RouterProvider router={router} />, {
    context: { user, loggedIn: true },
  });
  await screen.findByTestId(testIds.recipePage);
  expect(router.state.location.pathname).toBe("/");
});

test("admin user can create new recipe", async () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/new"],
    initialIndex: 0,
  });
  const user: User = createFakeUser({ isAdmin: true });
  renderWithProviders(<RouterProvider router={router} />, {
    context: { user, loggedIn: true },
  });
  expect(router.state.location.pathname).toBe("/new");
  await screen.findByTestId(testIds.recipePage);
  expect(screen.getByTestId(testIds.name)).toBeInTheDocument();
  expect((screen.getByTestId(testIds.name) as HTMLTextAreaElement).value).toBe("");
})

