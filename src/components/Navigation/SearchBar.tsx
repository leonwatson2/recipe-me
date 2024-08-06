import { FC } from "react"
import { SVG } from "../../assets/SvgElements"


type SearchBarProps = {
}

export const SearchBar:FC<SearchBarProps> = ()=>{
    return <div className="search-bar bg-grey rounded-3xl flex justify-center items-center gap-x-5 px-8">
            <SVG title="search-icon" className="w-7 h-7"/>
            <form>
                <label htmlFor="search"></label>
                <input className="bg-grey rounded focus:border-none h-8 focus-visible:outline-none" type="text" name="search" id="search" placeholder="Spicy Quesadillas"/>
            </form>
    </div>
}