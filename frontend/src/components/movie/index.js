import Button from "components/button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Arrow } from "assets/icons/arrow.svg";
import { fetchMovieByID } from "api";
import ImageComponent from "components/image";
import stalone from "assets/stalone.png";
import placeholder from "assets/share/movie-time.jpg";
import { ReactComponent as Star } from "assets/icons/star.svg";

function MovieView() {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function fetchMovie() {
      const { data } = await fetchMovieByID(id);
      setMovieData(data);
    }

    fetchMovie();
  }, []);

  const { title, overview, year, genres, duration, score, director, actors } =
    movieData;

  return (
    <div className="px-4 mt-14 max-w-5xl mx-auto md:px-8 lg:px-18 flex flex-col items-center">
      <div className="flex flex-col bg-light rounded-r-2xl sm:flex-row justify-center mb-12">
        <div className="w-full md:w-84 relative">
          <ImageComponent
            placeholderSrc={placeholder}
            src={movieData.image}
            fallback={stalone}
          />
          <div className="absolute top-8 rounded-r-lg text-slate-200 text-sm font-medium left-0 px-2 py-1 bg-dark">
            {year}
          </div>
        </div>

        <div className="p-6 lg:min-w-100 flex flex-col">
          <h3 className="text-sky-300 font-bold uppercase text-2xl md:text-3xl leading-11">
            {title}
          </h3>
          <p className="text-slate-200 leading-7">{overview}</p>
          <div className="mt-5 flex justify-between">
            <div className="flex gap-2 items-center">
              {genres &&
                genres.map((ele, idx) => {
                  return (
                    <div
                      className="text-slate-200 text-xs bg-dark rounded-lg py-1 px-2"
                      key={idx}
                    >
                      {ele}
                    </div>
                  );
                })}
              <div className="text-primary text-xs bg-dark rounded-lg py-1 px-2">
                {duration}min
              </div>
            </div>

            <p className="flex gap-1 text-slate-200 items-center">
              IMDb: <Star className="w-3 h-3 fill-primary" />
              <span className="font-bold">{score}</span>
            </p>
          </div>
          <div className="border-b-2 border-slate-600 my-5"></div>
          <div className="flex gap-4">
            <p className="text-sky-200">Director:</p>
            <span className="text-slate-200">{director}</span>
          </div>
          <div className="flex gap-4 mt-4">
            <p className="text-sky-200">Actors:</p>
            <div className="flex flex-col text-slate-200">
              {actors &&
                actors.map((ele, idx) => {
                  return <span key={idx}>{ele}</span>;
                })}
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate(-1);
        }}
        Icon={Arrow}
        text="Back to results"
      />
    </div>
  );
}

export default MovieView;
