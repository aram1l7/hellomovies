import React from "react";
import stalone from "assets/stalone.png";
import { ReactComponent as Star } from "assets/icons/star.svg";
function Card({
  layout,
  id,
  title,
  score,
  rating,
  overview,
  actors,
  director,
  duration,
  genres,
  year,
  image,
}) {
  return (
    <div className="flex cursor-pointer min-w-[16rem] flex-col gap-3">
      <div>
        <div className="relative">
          <object className="rounded-3xl" data={image} type="image/png">
            <img src={stalone} />
          </object>
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
                console.log(ele, "ele");
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
  );
}

export default Card;
