import { FC } from "react";
import { Recipe } from "../../types";

type RecipeIngredientsProps = Partial<Pick<Recipe, 'ingredients'>>
export const RecipeIngredients: FC<RecipeIngredientsProps> = ({ingredients = []})=>{
    return (<section className="ingredients min-w-96 max-w-128">
        <header className='font-bold text-4xl'>Ingredients</header>
        <ul className='mt-6'>
            {ingredients.map((ing)=><li className='text-xl mt-3'>{ing}</li>)}
        </ul>
    </section>)
}
