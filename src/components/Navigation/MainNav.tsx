import { Link, useLocation, useNavigate } from "react-router-dom";
import { SVG } from "../../assets/SvgElements";
import { useCallback, useRef } from "react";
import { ProfileButton } from "./ProfileButton";
import { GoogleLoginDialog, useUserContext } from "../auth";
import { SearchBar } from "./SearchBar";
import { HamburgerMenu } from "./HamburgerMenu";
import { MainNavWrapper } from "./MainNavWrapper";

export function MainNav() {
  const profileDialogRef = useRef<HTMLDialogElement>(null);
  const { user, loggedIn } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const onEmptySearch = () => {
    if (location.pathname !== "/" && !location.pathname.includes("recipe/")) {
      navigate("/");
    }
  };
  const onSearch = useCallback((searchTerm: string) => {
    navigate(`/search/?s=${encodeURI(searchTerm)}`);
  }, []);
  console.table(user)
  return (
    <>
      <MainNavWrapper>
        <li className="logo-container min-w-[195px] border-x-grey pt-2">
          <SVG
            title="yummm"
            height={100}
            className="absolute max-w-[195px]"
            svgClassName="the-hat"
          />
        </li>
        <li
          className={`hidden recipes
                            md:flex items-center
                            md:px-2 md:py-2
                            lg:px-10 lg:py-5
                            font-bold h-full hover:underline decoration-2`}
        >
          <Link to={"/"}>Recipes</Link>
        </li>
        {user?.isAdmin && loggedIn && (
          <li
            className={`hidden  recipes 
                            md:flex items-center
                            md:px-2 md:py-2
                              lg:px-10 lg:py-5 
                              font-bold h-full hover:underline decoration-2`}
          >
            <Link to={"/new"}>New Recipe</Link>
          </li>
        )}
        <li
          className={`hidden search 
                            md:px-2 
                            lg:px-10 
                            md:flex font-bold 
                            justify-self-end text-base ml-auto`}
        >
          <SearchBar
            onSearch={(searchTerm) => {
              navigate(`/search/?s=${encodeURI(searchTerm)}`);
            }}
            onEmpty={onEmptySearch}
          />
        </li>
        <li className="w-16 ml-auto flex justify-center items-center h-full">
          <ProfileButton dialogRef={profileDialogRef} />
          <GoogleLoginDialog ref={profileDialogRef} />
        </li>
        <HamburgerMenu
          onEmptySearch={onEmptySearch}
          onSearch={onSearch}
          isAdmin={user?.isAdmin || false}
          loggedIn={loggedIn}
        />
      </MainNavWrapper>
      <nav className="h-12 bg-lbrown"></nav>
    </>
  );
}
