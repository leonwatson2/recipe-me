import { Link, useLocation, useNavigate } from "react-router-dom";
import { SVG } from "../../assets/SvgElements";
import { useCallback, useRef } from "react";
import { ProfileButton } from "./ProfileButton";
import { GoogleLoginDialog, useUserContext } from "../auth";
import { SearchBar } from "./SearchBar";
import { HamburgerMenu } from "./HamburgerMenu";
import { MainNavWrapper } from "./MainNavWrapper";
import { adminLinks } from "../../routes";
import { ARCHIVE_PATH, RECIPE_PATH } from "@utils";
export function MainNav() {
  const profileDialogRef = useRef<HTMLDialogElement>(null);
  const { user, loggedIn } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const onEmptySearch = () => {
    if (
      location.pathname !== "/" &&
      !location.pathname.includes(RECIPE_PATH) &&
      !location.pathname.includes(ARCHIVE_PATH)
    ) {
      navigate("/");
    }
  };
  const onSearch = useCallback((searchTerm: string) => {
    navigate(`/search/?s=${encodeURI(searchTerm)}`);
  }, []);
  return (
    <>
      <MainNavWrapper>
        <li className="logo-container min-w-[195px] border-x-grey pt-2">
          <Link to="/">
            <SVG
              title="yummm"
              height={100}
              className="absolute max-w-[195px]"
              svgClassName="the-hat stroke-white"
            />
          </Link>
        </li>
        <NavLink title="Recipes" path="/" active={location.pathname === "/"} />

        {user?.isAdmin &&
          loggedIn &&
          adminLinks.map((link) => (
            <NavLink
              key={link.title}
              title={link.title}
              path={link.path}
              active={location.pathname === link.path}
            />
          ))}
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
function NavLink(props: { title: string; path: string; active: boolean }) {
  return (
    <li
      className={`hidden recipes
                  md:flex items-center
                  md:px-2 md:py-2
                  transition
                  duration-300
                  lg:px-10 lg:py-5
                  bg-black
                  hover:bg-black
                  ${!props.active && "bg-primary"}
                  `}
    >
      <Link className="w-full h-full flex items-center" to={props.path}>
        {props.title}
      </Link>
    </li>
  );
}
