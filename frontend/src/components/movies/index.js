import { fetchMovies } from "api";
import Pagination from "components/pagination";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ReactComponent as List } from "assets/icons/horizontal-cards-icon.svg";
import { ReactComponent as Grid } from "assets/icons/vertical-cards-icon.svg";
import Card from "./card";

function Movies({ movies, metadata, setData }) {
  const itemsPerPage = 20;

  const [movieData, setMovieData] = useState([]);

  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(null);

  const [layout, setLayout] = useState("grid");

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);

  useEffect(() => {
    if (movies) {
      setMovieData(movies);
    }
  }, [movies]);

  useEffect(() => {
    if (metadata) {
      setCurrentPage(metadata.currentPage);

      const newStartIdx = (currentPage - 1) * itemsPerPage + 1;
      const newEndIdx = Math.min(
        newStartIdx + itemsPerPage - 1,
        metadata.total
      );
      setStartIndex(newStartIdx);
      setEndIndex(newEndIdx);
    }
  }, [metadata]);

  useEffect(() => {
    async function fetchNewMovies() {
      const { data } = await fetchMovies({
        page: currentPage,
        search:
          searchParams.get("search") || document.getElementById("search").value,
      });

      setSearchParams((prevSearchParams) => {
        const newSearchParams = new URLSearchParams(prevSearchParams);
        newSearchParams.set(
          "search",
          searchParams.get("search") || document.getElementById("search").value
        );
        newSearchParams.set("page", currentPage);
        return newSearchParams;
      });

      setData(data);
    }

    if (!!searchParams.get("search")) {
      fetchNewMovies();
    }
  }, [currentPage]);

  return (
    <div className="text-slate-200">
      {movieData.length > 0 && !!metadata ? (
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between mt-10">
            <p>
              Found <span className="text-primary">{metadata.total}</span>{" "}
              Movies
            </p>

            <div className="flex gap-2 items-center">
              <span>layout:</span>
              <div
                data-testid="toggle-grid"
                onClick={() => {
                  if (layout === "grid") return;
                  setLayout("grid");
                }}
                className={`p-2.5 group cursor-pointer rounded-lg ${
                  layout === "grid" ? "bg-light" : "bg-slate-900"
                } `}
              >
                <Grid
                  className={`w-3 h-3 group-hover:fill-primary duration-200 ease-in transition-colors ${
                    layout === "grid" ? "fill-primary" : ""
                  } `}
                />
              </div>
              <div
                data-testid="toggle-list"
                onClick={() => {
                  if (layout === "list") return;
                  setLayout("list");
                }}
                className={`p-2.5 group cursor-pointer rounded-lg ${
                  layout === "list" ? "bg-light" : "bg-slate-900"
                } `}
              >
                <List
                  className={`w-3 h-3 group-hover:fill-primary duration-200 ease-in transition-colors ${
                    layout === "list" ? "fill-primary" : ""
                  } `}
                />
              </div>
            </div>
          </div>
          <div
            data-testid="grid-list"
            className={`mt-8 select-none auto-cols-max grid gap-5 grid-cols-1 xs:grid-cols-2 ${
              layout === "grid"
                ? "md:grid-cols-3 lg:grid-cols-4 layout-grid"
                : "layout-list"
            } `}
          >
            {movieData.map((ele) => {
              return <Card key={ele.id} {...ele} layout={layout} />;
            })}
          </div>
          <Pagination
            startIndex={startIndex}
            endIndex={endIndex}
            total={metadata.total}
            totalPages={metadata.totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      ) : (
        <>
          {searchParams.get("search") && (
            <div
              className="text-primary lg:w-[512px] w-full my-10 text-center text-base 
             md:text-xl bg-light py-6 px-14 rounded-2xl"
            >
              No results found for "{searchParams.get("search")}"
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Movies;
