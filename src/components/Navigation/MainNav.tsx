import { Link, useLocation, useNavigate } from "react-router-dom";
import { SVG } from "../../assets/SvgElements";
import { useEffect, useRef } from "react";
import { ProfileButton } from "./ProfileButton";
import { GoogleLoginDialog, useUserContext } from "../auth";
import { SearchBar } from "./SearchBar";

export function MainNav() {
  const profileDialogRef = useRef<HTMLDialogElement>(null);
  const { hamMenuRef, headerRef, closeMenu } = useMenuClick();
  const { user, loggedIn } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <header className="mx-auto center w-auto bg-primary sticky top-0 z-10">
        <nav className="container mx-auto max-w-7xl h-16">
          <ul className="flex text-xl h-16">
            <li className="logo-container min-w-[195px] border-x-grey pt-2">
              <SVG
                title="the-logo"
                height={100}
                className="absolute max-w-[195px]"
              />
            </li>
            <li className="hidden md:block recipes px-10 py-5 font-bold h-full hover:underline decoration-2 ">
              <Link to={"/"}>Recipes</Link>
            </li>
            {user?.isAdmin && loggedIn && (
              <li className="hidden md:block recipes px-10 py-5 font-bold h-full hover:underline decoration-2 ">
                <Link to={"/new"}>New Recipe</Link>
              </li>
            )}
              <li className="search px-10 md:flex font-bold justify-self-end text-base ml-auto">
                <SearchBar
                  onSearch={(searchTerm) => {
                    navigate(`/search/?s=${encodeURI(searchTerm)}`);
                    }}
                  onEmpty={() => {
                    if (location.pathname !== "/"){ 
                      navigate("/");
                    }
                  }}
                />
              </li>
            <li className="w-16 ml-auto flex justify-center items-center h-full">
              <ProfileButton dialogRef={profileDialogRef} />
              <GoogleLoginDialog ref={profileDialogRef} />
            </li>
            <label
              htmlFor="menu"
              className="mr-2 flex justify-center items-center md:hidden"
            >
              <SVG
                className="right-2 top-2 md:hidden"
                title="hamburger"
                width={40}
                height={40}
              />

              <input
                ref={hamMenuRef}
                type="checkbox"
                name="ham-menu"
                id="menu"
                className="peer hidden"
              />
              <div
                className="absolute top-0 right-0 -translate-y-full bg-grey w-full md:hidden peer-checked:translate-y-0 transition overflow-hidden"
                autoFocus
                onBlur={() => {
                  if (hamMenuRef.current) hamMenuRef.current.checked = false;
                }}
              >
                <ul className="w-full" ref={headerRef}>
                  {user?.isAdmin && loggedIn && (
                    <li
                      className="h-20 text-center text-2xl border"
                      onClick={closeMenu}
                    >
                      <Link
                        className="w-full h-full flex items-center"
                        to={"/new"}
                      >
                        New Recipe
                      </Link>
                    </li>
                  )}
                  <li
                    className="h-20 text-center text-2xl border"
                    onClick={closeMenu}
                  >
                    <Link className="w-full h-full flex items-center" to={"/"}>
                      Recipes
                    </Link>
                  </li>
                </ul>
              </div>
            </label>
          </ul>
        </nav>
      </header>
      <nav className="h-12 bg-lbrown"></nav>
    </>
  );
}

export function useMenuClick() {
  const headerRef = useRef<HTMLUListElement>(null);
  const hamMenuRef = useRef<HTMLInputElement>(null);

  const closeMenu = () => {
    if (hamMenuRef.current) hamMenuRef.current.checked = false;
  };
  useEffect(() => {
    const clickOutsideHandler = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        closeMenu();
        e.stopPropagation();
      }
    };
    document.addEventListener("mousedown", clickOutsideHandler);
    () => {
      document.removeEventListener("mousedown", clickOutsideHandler);
    };
  }, [headerRef]);

  return { headerRef, hamMenuRef, closeMenu };
}
