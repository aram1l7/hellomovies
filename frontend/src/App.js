import Home from "layout";
import Movie from "layout/movie";
import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<Movie />} />
      </Routes>
    </Router>
  );
}

export default App;
