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
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { EditingRecipe, isRecipe, Recipe } from "../types";
import { User } from "../components/auth/types.ts";
import { v4 as uuid } from "uuid";
import "../firebase/config.ts";

const DB_RECIPE_ROOT = "recipes";
const DB_USERS_ROOT = "users";

const db = getFirestore();

const convertNameToSlug = (name: string): string =>
  name.toLowerCase().trim().replaceAll(" ", "-");

export const getAllRecipes = async (): Promise<Array<Recipe>> => {
  try {
    const recipesRef = getDocs(collection(db, DB_RECIPE_ROOT));
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

export const updateRecipe = async ({
  photoUploads,
  ...noUploadsRecipe
}: EditingRecipe): Promise<void> => {
  try {
    const storage = getStorage();
    const newPhotoUrls = await uploadPhotos(
      photoUploads,
      noUploadsRecipe.slug,
    );
    const recipeDoc = doc(db, DB_RECIPE_ROOT, noUploadsRecipe.id);

    const photoUrls = await Promise.all(
      newPhotoUrls.map((u) => getDownloadURL(ref(storage, u))),
    );

    await setDoc(recipeDoc, { ...noUploadsRecipe, photoUrls });
  } catch (e) {
    console.log(e, noUploadsRecipe);
    throw Error("Something went wrong updating recipe");
  }
};

export const addRecipe = async (newRecipe: Recipe): Promise<string> => {
  try {
    const { id, ...noIdRecipe } = newRecipe;
    const recipeCol = collection(db, DB_RECIPE_ROOT);
    noIdRecipe.slug = convertNameToSlug(noIdRecipe.name);
    await addDoc(recipeCol, noIdRecipe);

    return noIdRecipe.slug;
  } catch {
    throw Error("Something went adding recipe");
  }
};

export const getRecipeBySlug = async (slug: string): Promise<Recipe> => {
  try {
    const q = query(collection(db, DB_RECIPE_ROOT), where("slug", "==", slug));
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

export const getUserById = async (id: string): Promise<User> => {
  const docRef = doc(db, DB_USERS_ROOT, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as User;
  } else {
    throw Error("Couldn't find user with id");
  }
};

export const uploadPhotos = async (files: Array<File> = [], slug: string) => {
  if (files.length == 0) return [];
  const storage = getStorage();
  try {
    const fileUploads = files.map((file) => {
      const fileName = `${DB_RECIPE_ROOT}/${slug}/${file.name.split(".").shift()}-${uuid()}.${file.name.split(".").pop()}`;
      const recipeStorageRef = ref(storage, fileName);
      return uploadBytes(recipeStorageRef, file);
    });
    const uploadResults = await Promise.all(fileUploads);
    const fullPathsToPhotos = uploadResults.map(
      (result) => result.ref.fullPath,
    );
    return fullPathsToPhotos;
  } catch (e) {
    throw Error("Error uploading file");
  }
};
export const addUser = async (email: string, isAdmin = false) => {
  const newUserNoId = {
    email,
    isAdmin,
    favorites: [],
  };
  const userCol = collection(db, DB_USERS_ROOT);
  const snapshot = await addDoc(userCol, newUserNoId);
  if (snapshot.id) {
    return snapshot.id;
  }
  throw Error("Failed making user");
};
export const loginUser = async (email: string): Promise<User> => {
  const q = query(collection(db, DB_USERS_ROOT), where("email", "==", email));
  const snapshot = await getDocs(q);
  if (snapshot.docs[0]) {
    return snapshot.docs[0].data() as User;
  } else {
    const id = await addUser(email);
    return getUserById(id);
  }
};
