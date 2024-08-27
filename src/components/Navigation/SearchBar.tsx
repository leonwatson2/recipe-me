import { FC, FormEventHandler, useCallback, useEffect, useState } from "react";
import { SVG } from "../../assets/SvgElements";
import { createSearchParams, useLocation } from "react-router-dom";
import { SEARCH_TERM_KEY } from "../utils";

type SearchBarProps = {
  onSearch: (searchTerm: string) => void;
  onEmpty: () => void;
};
const timeoutLength = 300;
export const SearchBar: FC<SearchBarProps> = ({ onSearch, onEmpty }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation()
  const onChange: FormEventHandler<HTMLInputElement> = useCallback((e) => {
    setSearchTerm(e.currentTarget.value);
  }, []);
  useEffect(()=>{
    if (createSearchParams(location.search).has(SEARCH_TERM_KEY)) {
      const srchTerm = createSearchParams(location.search).get(SEARCH_TERM_KEY) || '';
      setSearchTerm(srchTerm)
    }
  },[])
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (searchTerm.length > 2) {
        onSearch(searchTerm);
      } else if (searchTerm.length === 0) {
        onEmpty();
      }
    }, timeoutLength);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [searchTerm]);
  return (
    <div className={`search-bar bg-grey 
                    grid col-2 gap-x-5 grid-cols-[1.75rem_1fr] 
                    md:flex md:justify-center md:px-8 
                    items-center  h-full
                    `}>
      <SVG title="search-icon" className="w-7 h-7" />
      <form className="max-w-full">
        <label htmlFor="search"></label>
        <input
          className="bg-grey rounded focus:border-none h-8 focus-visible:outline-none"
          type="text"
          name="search"
          id="search"
          value={searchTerm}
          placeholder="Spicy Quesadillas"
          onChange={onChange}
        />
      </form>
    </div>
  );
};
