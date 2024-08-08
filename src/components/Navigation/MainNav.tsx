import { SVG } from "../../assets/SvgElements";
import { SearchBar } from "./SearchBar";

export function MainNav () {
    return (
        <>
        <header className="mx-auto center w-auto bg-primary sticky top-0 z-10">
            <nav className="container mx-auto max-w-7xl max-h-16">
                <ul className="flex text-xl">
                    <li className="logo-container border-x-grey pt-2">
                        <SVG title="the-logo" height={100} width={195} className="absolute"/>
                    </li>
                    <li className="recipes px-10 py-5 font-bold h-full hover:underline decoration-2 ">
                        Recipes
                        </li>
                    <li className="search px-10 py-3 flex font-bold justify-self-end text-base ml-auto">
                        <SearchBar />
                    </li>
                </ul>
            </nav>
        </header>
        <nav className="h-12 bg-lbrown"></nav>
        </>
    )
}