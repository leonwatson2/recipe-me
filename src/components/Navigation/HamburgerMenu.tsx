import { FC, useEffect, useRef } from "react";
import { SVG } from "../../assets/SvgElements";
import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { ARCHIVE_PATH } from "../../routes";

type HamburgerMenuProps = {
  isAdmin: boolean;
  loggedIn: boolean;
  onEmptySearch: () => void;
  onSearch: (searchTerm: string) => void;
};

export const HamburgerMenu: FC<HamburgerMenuProps> = ({
  isAdmin,
  loggedIn,
  onEmptySearch,
  onSearch,
}) => {
  const { hamMenuRef, headerRef, closeMenu } = useMenuClick();
  return (
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
          {isAdmin && loggedIn && (
            <>
            <li
              className="h-20 text-center text-2xl border"
              onClick={closeMenu}
            >
              <Link className="w-full h-full flex items-center" to={`/${ARCHIVE_PATH}`}>
                Archives
              </Link>
            </li>
            <li
              className="h-20 text-center text-2xl border"
              onClick={closeMenu}
            >
              <Link className="w-full h-full flex items-center" to={"/new"}>
                New Recipe
              </Link>
            </li>
            </>
          )}
          <li className="h-20 text-center text-2xl border" onClick={closeMenu}>
            <Link className="w-full h-full flex items-center" to={"/"}>
              Recipes
            </Link>
          </li>
          <li className="h-20 text-3xl border border-t-0">
            <SearchBar onSearch={onSearch} onEmpty={onEmptySearch} />
          </li>
        </ul>
      </div>
    </label>
  );
};
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
