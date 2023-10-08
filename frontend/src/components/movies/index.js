import { fetchMovies } from "api";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Movies({ movies, metadata, setData }) {
  const itemsPerPage = 20;

  const [movieData, setMovieData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [startIndex, setStartIndex] = useState(1);
  const [endIndex, setEndIndex] = useState(null);

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
        <>
          <div className="flex flex-wrap">
            {movieData.map((ele) => {
              return (
                <div key={ele.id}>
                  <span>{ele.title}</span>
                </div>
              );
            })}
          </div>
          <div>
            Showing {startIndex} to {endIndex} of {metadata.total} results
          </div>

          <div>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <button
              disabled={currentPage === metadata.totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <>{searchParams.get("search") && <div>No results</div>}</>
      )}
    </div>
  );
}

export default Movies;
