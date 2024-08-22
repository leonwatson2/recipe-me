import { Link } from "react-router-dom";
import { SVG } from "../../assets/SvgElements";
import { SearchBar } from "./SearchBar";
import { useEffect, useRef } from "react";
import { ProfileButton } from "./ProfileButton";
import { GoogleLoginDialog, useUserContext } from "../auth";

export function MainNav() {
  const profileDialogRef = useRef<HTMLDialogElement>(null);
  const { hamMenuRef, headerRef, closeMenu } = useMenuClick();
  const { user, loggedIn } = useUserContext()
  return (
    <>
      <header className="mx-auto center w-auto bg-primary sticky top-0 z-10">
        <nav className="container mx-auto max-w-7xl h-16">
          <ul className="flex text-xl h-16">
            <li className="logo-container border-x-grey pt-2">
              <SVG
                title="the-logo"
                height={100}
                width={195}
                className="absolute"
              />
            </li>
            <li className="hidden md:block recipes px-10 py-5 font-bold h-full hover:underline decoration-2 ">
              <Link to={"/"}>Recipes</Link>
            </li>
            {user?.isAdmin && loggedIn &&
              <li
                className="hidden md:block recipes px-10 py-5 font-bold h-full hover:underline decoration-2 ">
                <Link to={"/new"}>New Recipe</Link>
              </li>
            }
            <li className="hidden search px-10 py-3 md:flex font-bold justify-self-end text-base ml-auto">
              <SearchBar />
            </li>
            <li className="w-16 flex justify-center items-center h-full">
              <ProfileButton dialogRef={profileDialogRef} />
              <GoogleLoginDialog
                ref={profileDialogRef}
              />
            </li>
            <label htmlFor="menu" className="right-2 top-2 md:hidden">
              <SVG
                className="absolute right-2 top-2 md:hidden"
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
                  {user?.isAdmin && loggedIn && <li
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
                  }
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
