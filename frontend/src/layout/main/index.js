import SearchInput from "components/search-input";
import React, { useState } from "react";
import { ReactComponent as MovieIcon } from "assets/icons/movie.svg";
import { ReactComponent as TvIcon } from "assets/icons/tv.svg";
import Movies from "components/movies";

function Main() {
  const [data, setData] = useState({});

  return (
    <div className="w-full px-4 md:px-5 lg:px-10 bg-dark min-h-content flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="flex flex-col text-center max-w-3xl">
          <h1
            data-testid="headline"
            className="text-slate-100 mt-24 font-bold text-3xl md:text-5xl lg:text-6.5xl md:leading-11 lg:leading-14"
          >
            Need help finding the next movie?
          </h1>
          <p
            data-testid="subheading"
            className="text-sky-200 mt-3 text-base md:text-lg lg:text-xl lg:leading-7"
          >
            Search for your next movie through HelloMovie’s huge <br /> movie
            library
          </p>
          <SearchInput setData={setData} />
          <div className="mt-3.5 gap-8 items-center flex justify-center">
            <div className="flex gap-3 items-center">
              <MovieIcon className="fill-primary w-5 h-4" />
              <p className="text-slate-200 text-xl leading-5">Movies</p>
            </div>

            <div className="flex gap-3 items-center">
              <TvIcon className="fill-primary w-5 h-4" />
              <p className="text-slate-200 text-xl leading-5">TV Shows</p>
            </div>
          </div>
        </div>
        <Movies
          setData={setData}
          movies={data.movies}
          metadata={data.metadata}
        />
      </div>
    </div>
  );
}

export default Main;
