import React from "react";
import Header from "../../component/Header/Header";
import { useMovie } from "../../context/MovieProvider";
import MovieCard from "../../component/MovieCard/MovieCard";

function Starmovie() {
  const { state } = useMovie();
  return (
    <div>
      <Header />
      <div className="movie-container">
        {state.starredMovie.length > 0 ? (
          state.starredMovie.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <h2>No Movie Available</h2>
        )}
      </div>
    </div>
  );
}

export default Starmovie;
