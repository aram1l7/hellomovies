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
  const [currentPage, setCurrentPage] = useState(1);

  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(null);

  const [layout, setLayout] = useState("grid");

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (movies) {
      setMovieData(movies);
    }
  }, [movies]);

  useEffect(() => {
    if (metadata) {
      setCurrentPage(metadata.currentPage);

      const newStartIdx = (currentPage - 1) * itemsPerPage + 1;
      console.log(newStartIdx, "startIdx");
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
            className={`mt-8 auto-cols-max grid gap-5 grid-cols-1 xs:grid-cols-2 ${
              layout === "grid" ? "md:grid-cols-3 lg:grid-cols-4" : ""
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
        <>{searchParams.get("search") && <div>No results</div>}</>
      )}
    </div>
  );
}

export default Movies;
