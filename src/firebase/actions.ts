import { getFirestore, getDocs, collection } from "firebase/firestore";
import { Recipe } from "../types";

const db = getFirestore();

export const getAllRecipes = async ():Promise<Array<Recipe>> => {
    try{
    
        const recipesRef = getDocs(collection(db, `recipes`))
        const recipes = (await recipesRef).docs.map((doc)=>{
            return {
                id: doc.id,
                ...doc.data() as Omit<Recipe,'id'>
            }
        })
        return recipes;

    } catch {
        throw Error('Something went wrong getting recipes')
        
    }

} 