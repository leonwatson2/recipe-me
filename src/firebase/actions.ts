import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
} from "firebase/firestore";
import { Recipe } from "../types";

const db = getFirestore();

export const getAllRecipes = async (): Promise<Array<Recipe>> => {
  try {
    const recipesRef = getDocs(collection(db, `recipes`));
    const recipes = (await recipesRef).docs.map((doc) => {
      return {
        id: doc.id,
        ...(doc.data() as Omit<Recipe, "id">),
      };
    });
    return recipes;
  } catch {
    throw Error("Something went wrong getting recipes");
  }
};

export const updateRecipe = async (updatedRecipe: Recipe): Promise<void> => {
  try {
    const recipeDoc = doc(db, `recipes`, updatedRecipe.id);
    const snapshot = await setDoc(recipeDoc, updatedRecipe);
    console.log("updated", snapshot);
  } catch {
    throw Error("Something went wrong getting recipes");
  }
};
