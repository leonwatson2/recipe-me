import { Timestamp } from "firebase/firestore";

export type VITE_ENV = {
  VITE_FIREBASE_API_KEY: string;
  VITE_FIREBASE_AUTH_DOMAIN: string;
  VITE_FIREBASE_PROJECT_ID: string;
  VITE_FIREBASE_STORAGE_BUCKET: string;
  VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  VITE_FIREBASE_APP_ID: string;
  VITE_GOOGLE_AUTH_CLIENT_ID: string;
};

export type Recipe = {
  id: string;
  slug: string;
  name: string;
  cookTime: number;
  dateAdded: { seconds: number };
  foodTypes: Array<string>;
  ingredients: Array<string>;
  instructions: Array<string>;
  timeTypes: Array<string>;
  intro: string;
  photoUrls: Array<string>;
  videoUrls: Array<string>;
  prepTime: number;
  servingSize: string;
  notes: string;
  searchTerms: Array<string>;
};

export type EditingRecipe = Recipe & { photoUploads?:Array<File> }

export type NewRecipe = Recipe;

export type ModifyListItemFunction = (
  index: number,
  values?: Array<string>,
) => void;

export type RemoveItemFunction = <T extends keyof EditingRecipe>(
  property: T,
  index: number,
) => void;

export const createEmptyRecipe: () => NewRecipe = () => {
  return {
    id: "",
    slug: "",
    name: "",
    cookTime: 0,
    dateAdded: Timestamp.now(),
    foodTypes: [],
    ingredients: [""],
    instructions: [""],
    timeTypes: [],
    intro: "",
    photoUrls: [],
    videoUrls: [],
    prepTime: 0,
    servingSize: "",
    notes: "",
    searchTerms: [],
  };
};

export function isRecipe(value: unknown): value is Recipe {
  const possibleRecipe = value as Recipe;
  return (
    possibleRecipe !== undefined &&
    possibleRecipe.name !== undefined &&
    possibleRecipe.slug !== undefined &&
    possibleRecipe.id !== undefined &&
    Array.isArray(possibleRecipe.ingredients) &&
    Array.isArray(possibleRecipe.instructions)
  );
}
