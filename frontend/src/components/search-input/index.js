import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";
import { fetchMovies } from "api";
import { createPortal } from "react-dom";
import Overlay from "components/overlay";
import { useSearchParams } from "react-router-dom";

function SearchInput({ setData }) {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const queryParamsObject = Object.fromEntries(searchParams.entries());
  
    const search = e.target.elements[0].value;
    const { data } = await fetchMovies({ search, page: 1 });

    setSearchParams((prevSearchParams) => {
      const newSearchParams = new URLSearchParams(prevSearchParams);
      newSearchParams.set('search', search);
      return newSearchParams;
    });

    setData(data);
    setTimeout(() =>{
      setLoading(false); //set little bit late to showcase loading
    }, 100)
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-5 flex justify-center">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
            <SearchIcon className="w-4.5 h-4.5 fill-primary" />
          </div>
          <input
            type="search"
            className="block lg:w-[512px] w-full rounded-2xl pt-4.5 pb-4 pl-14 pr-6 
           text-slate-100 text-base md:text-lg lg:text-xl border border-transparent placeholder-[#475569]
           bg-slate-900  focus:border-sky-200"
            placeholder="Search for your next movie."
            required
          />
        </div>
      </form>
      {loading && createPortal(
        <Overlay/>,
        document.body
      )}
    </>
  );
}

export default SearchInput;
