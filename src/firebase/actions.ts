import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  query,
  where,
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
    throw Error("Something went wrong updating recipe");
  }
};

export const getRecipeBySlug = async (slug: string): Promise<Recipe> => {
  try {
    const q = query(collection(db, "recipes"), where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.docs[0]) {
      return snapshot.docs[0].data() as Recipe;
    }
    throw Error(`Something went wrong finding recipe with slug '${slug}'`);
  } catch {
    throw Error(`Something went wrong finding recipe with slug '${slug}'`);
  }
};
