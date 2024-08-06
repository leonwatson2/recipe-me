import { FC } from 'react'

type RecipeTimeProps = {
    prepTime: number,
    cookTime: number
}

export const RecipeTime:FC<RecipeTimeProps> = ({ prepTime, cookTime })=>{



    return (<div className='time-section flex mt-5'>
        <div className='border-r-2 border-primary border-opacity-60 pr-4'>
            <header className='text-sm font-bold '>Total Time</header>
            <p>{prepTime + cookTime} Minutes</p>
        </div>
        <div className='border-r-2 border-primary border-opacity-60 pl-4 pr-4'>
            <header className='text-sm font-bold'>Prep Time</header>
            <p>{prepTime} Minutes</p>
        </div>
        <div className='pl-4 pr-4'>
            <header className='text-sm font-bold'>Cook Time</header>
            <p>{cookTime} Minutes</p>
        </div>
    </div>)
}