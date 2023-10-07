import React from "react";
import { ReactComponent as SearchIcon } from "assets/icons/search.svg";

function SearchInput() {
  return (
    <form className="mt-5 flex justify-center">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
          <SearchIcon className="w-4.5 h-4.5 fill-primary" />
        </div>
        <input
          type="search"
          id="default-search"
          className="block lg:w-[512px] w-full rounded-2xl pt-4.5 pb-4 pl-14 pr-6 
           text-slate-100 text-base md:text-lg lg:text-xl border border-transparent placeholder-[#475569]
           bg-slate-900  focus:border-sky-200"
          placeholder="Search for your next movie."
          required
        />
      </div>
    </form>
  );
}

export default SearchInput;
