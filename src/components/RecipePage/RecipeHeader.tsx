import { FC } from "react"
import { Recipe } from "../../types"
import { Timestamp } from "firebase/firestore"

type RecipeHeaderProps = Partial<Pick<Recipe, 'name' | 'intro' | 'dateAdded'>>

export const RecipeHeader:FC<RecipeHeaderProps> = ({ name = `The Best Meal You'll ever have`, intro = '', dateAdded = { seconds:0 } }) => {
    
    const date = new Timestamp(dateAdded.seconds, 0)

    return (
        <>
            <h1 className='text-7xl my-12'>{name || 'A delicious Recipe'}</h1>
            <p className='text-3xl mb-5'> {intro} </p>
            <p className='text-2xl italic opacity-70'> Updated on {date.toDate().toDateString()}</p>
        </>
    )
}