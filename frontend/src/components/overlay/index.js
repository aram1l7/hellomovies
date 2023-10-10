import React from "react";
import { ReactComponent as Loading } from "assets/animation/loading.svg";
import { useSearchParams } from "react-router-dom";
function Overlay() {
  const [searchParams] = useSearchParams();
  return (
    <div className="fixed top-0 left-0 w-full h-full flex flex-col gap-4 justify-center items-center z-100 backdrop-brightness-50">
      <Loading className="w-12 h-12" />
      <div className="text-primary">
        Searching in {searchParams.get("search")} ...
      </div>
    </div>
  );
}

export default Overlay;
