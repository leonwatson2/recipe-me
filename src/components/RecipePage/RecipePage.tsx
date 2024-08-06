import { FC, useEffect, useState } from 'react'
import { Recipe } from '../../types'
import '../../firebase/config'
import { getAllRecipes } from '../../firebase/actions'
import { RecipeTime } from './RecipeTime'
import { RecipeHeader } from './RecipeHeader'
import { RecipeIngredients } from './RecipeIngredients'

type RecipePageProps = {

}

export const RecipePage:FC<RecipePageProps> = ()=>{
    const [recipe, setRecipe] = useState<Recipe>()

    useEffect(()=>{
        getAllRecipes().then((recipes)=>{
            setRecipe(recipes[0])
            console.log(recipe?.dateAdded)
        })
    },[])

    const hasVideo = recipe?.videoUrls ? recipe.videoUrls.length > 0 : false
    return <div className='recipe-page mx-auto max-w-7xl' >

        <RecipeHeader 
            dateAdded={recipe?.dateAdded} 
            intro={recipe?.intro}  
            name={recipe?.name}
        />
        
        <RecipeTime 
            cookTime={recipe?.cookTime || 0} 
            prepTime={recipe?.prepTime || 0} 
        />
        <main className='flex w-full content-start mt-7 min-w-96'>
            <RecipeIngredients ingredients={recipe?.ingredients} />
            <section className="preparation min-w-96 max-w-128">
                <header className='font-bold text-4xl'>Preparation</header>
                <ol className='mt-6 ml-6'>
                    {recipe?.instructions.map((ing)=><li className='text-xl mt-3 -ml-6 before:w-8 before:font-extrabold before:inline-block before:text-grey'>{ing}</li>)}
                </ol>
            </section>
            <section className='media ml-5'>
                {
                    hasVideo &&
                    <div className='video-container'>
                        <video  src={recipe?.videoUrls[0]} controls controlsList={'nodownload noremoteplay'}></video>
                    </div>
                }
            </section>
        </main>
    </div>
}