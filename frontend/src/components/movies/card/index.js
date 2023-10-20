import React from "react";
import stalone from "assets/stalone.png";
import { ReactComponent as Star } from "assets/icons/star.svg";
import ImageComponent from "components/image";
import placeholder from "assets/share/movie-time.jpg";
import { Link } from "react-router-dom";

function Card({
  layout,
  id,
  title,
  score,
  duration,
  genres,
  year,
  image,
}) {
  return (
    <Link to={`/movies/${id}`}>
      {layout === "grid" ? (
        <div className="flex cursor-pointer flex-col gap-3">
          <div>
            <div className="relative">
              <ImageComponent
                src={image}
                placeholderSrc={placeholder}
                fallback={stalone}
              />

              <div className="absolute top-8 rounded-r-lg text-slate-200 text-sm font-medium left-0 px-2 py-1 bg-dark">
                {year}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <h3 className="text-sky-300 font-bold text-base">{title}</h3>
            <div className="text-xs flex">
              <p>
                {genres
                  .map((ele) => {
                    return ele;
                  })
                  .join(", ")}{" "}
              </p>
              <p className="text-sky-300">·</p> <p>{duration} min</p>
            </div>
            <p className="flex gap-1 text-xs items-center">
              IMDb: <Star className="w-3 h-3 fill-primary" />
              <span className="font-bold">{score}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex cursor-pointer lg:min-w-[34rem] bg-light rounded-r-2xl">
          <div className="w-28">
            <ImageComponent
              src={image}
              placeholderSrc={placeholder}
              fallback={stalone}
            />
          </div>
          <div className="flex w-full flex-col justify-between px-5 pt-4 pb-5">
            <div className="flex justify-between">
              <div className="rounded-lg px-2 py-1 text-xs bg-dark text-slate-200">
                {year}
              </div>
              <p className="flex gap-1 text-xs items-center">
                IMDb: <Star className="w-3 h-3 fill-primary" />
                <span className="font-bold">{score}</span>
              </p>
            </div>
            <div className="mt-10">
              <h3 className="text-sky-300 font-bold text-base">{title}</h3>
              <div className="text-xs flex">
                <p>
                  {genres
                    .map((ele) => {
                      return ele;
                    })
                    .join(", ")}{" "}
                </p>
                <p className="text-sky-300">·</p> <p>{duration} min</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}

export default Card;
