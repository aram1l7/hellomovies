import React, { useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import { fetchMovies } from "api";
import { createPortal } from "react-dom";
import Overlay from "components/overlay";
import { useSearchParams } from "react-router-dom";

function SearchInput({ setData }) {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data } = await fetchMovies({ search: searchValue, page: 1 });

    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.set("search", searchValue);
      newSearchParams.set("page", newSearchParams.get("page") || 1);
      return newSearchParams;
    });

    setData(data);
    setTimeout(() => {
      setLoading(false); //set little bit late to showcase loading
    }, 100);
  };

  useEffect(() => {
    if (searchParams.get("search")) {
      setSearchValue(searchParams.get("search"));
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-5 flex justify-center">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
            <SearchIcon className="w-4.5 h-4.5 fill-primary" />
          </div>
          <input
            id="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            type="search"
            className="block lg:w-[512px] w-full rounded-2xl pt-4.5 pb-4 pl-14 pr-6 
           text-slate-100 text-base md:text-lg lg:text-xl border border-transparent placeholder-[#475569]
           bg-slate-900  focus:border-sky-200"
            placeholder="Search for your next movie."
            required
          />
        </div>
      </form>
      {loading && createPortal(<Overlay />, document.body)}
    </>
  );
}

export default SearchInput;
