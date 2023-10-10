import MovieView from "components/movie";
import Footer from "layout/footer";
import Header from "layout/header";
import React from "react";

function Movie() {
  return (
    <div className="bg-dark min-h-screen">
      <Header />
      <MovieView />
      <Footer />
    </div>
  );
}

export default Movie;
