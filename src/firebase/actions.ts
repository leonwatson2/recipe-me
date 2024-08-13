import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { isRecipe, Recipe } from "../types";
import "../firebase/config.ts";

const db = getFirestore();

export const getAllRecipes = async (): Promise<Array<Recipe>> => {
  try {
    const recipesRef = getDocs(collection(db, `recipes`));
    const recipes = (await recipesRef).docs.map((doc) => {
      return {
        ...(doc.data() as Omit<Recipe, "id">),
        id: doc.id,
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
  } catch (e) {
    console.log(e, updatedRecipe);
    throw Error("Something went wrong updating recipe");
  }
};

export const addRecipe = async (newRecipe: Recipe): Promise<string> => {
  try {
    const { id, ...noIdRecipe } = newRecipe;
    const recipeCol = collection(db, `recipes`);
    noIdRecipe.slug = noIdRecipe.name.toLowerCase().trim().replaceAll(" ", "-");
    await addDoc(recipeCol, noIdRecipe);

    return noIdRecipe.slug;
  } catch {
    throw Error("Something went adding recipe");
  }
};

export const getRecipeBySlug = async (slug: string): Promise<Recipe> => {
  try {
    const q = query(collection(db, "recipes"), where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.docs[0]) {
      const potentialRecipe = {
        ...snapshot.docs[0].data(),
        id: snapshot.docs[0].id,
      };
      if (isRecipe(potentialRecipe)) return potentialRecipe;
    }
    throw Error(
      `Something went wrong finding recipe with slug '${slug}' potentially not a recipe`,
    );
  } catch {
    throw Error(`Something went wrong finding recipe with slug '${slug}'`);
  }
};
