import { Timestamp } from "firebase/firestore";

export type VITE_ENV = {
  VITE_FIREBASE_API_KEY: string;
  VITE_FIREBASE_AUTH_DOMAIN: string;
  VITE_FIREBASE_PROJECT_ID: string;
  VITE_FIREBASE_STORAGE_BUCKET: string;
  VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  VITE_FIREBASE_APP_ID: string;
};

export type Recipe = {
  id: any;
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
};

export type NewRecipe = Recipe;

export type ModifyListItemFunction = (index: number, force?: boolean) => void;

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
  };
};
