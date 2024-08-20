import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  query,
  where,
  addDoc,
  getDoc,
} from "firebase/firestore";
import { isRecipe, Recipe } from "../types";
import "../firebase/config.ts";
import { User } from "../components/auth/types.ts";

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

export const getUserById = async (id:string):Promise<User> => {
  const docRef = doc(db, 'users', id)
  const docSnap = await getDoc(docRef)
  if(docSnap.exists()){
    return docSnap.data() as User
  } else {
    throw Error("Couldn't find user with id")
  }
 
}

export const addUser = async (email:string, isAdmin = false) => {
  const newUserNoId = {
    email,
    isAdmin,
    favorites: []
  }
  const userCol = collection(db, `users`);
  const snapshot = await addDoc(userCol, newUserNoId);
  if(snapshot.id){
    return snapshot.id
  }
  throw Error("Failed making user")
}
export const loginUser = async (email:string):Promise<User> => {
  
  const q = query(collection(db, "users"), where("email", "==", email)); 
  const snapshot = await getDocs(q)
  if(snapshot.docs[0]){
    return snapshot.docs[0].data() as User 
  } else {
    const id = await addUser(email)
    return getUserById(id)
  }

}
