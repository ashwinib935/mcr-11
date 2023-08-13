import React from "react";
import Header from "../../component/Header/Header";
import { useMovie } from "../../context/MovieProvider";
import MovieCard from "../../component/MovieCard/MovieCard";

function WatchList() {
  const { state } = useMovie();
  return (
    <div>
      <Header />
      <div className="movie-container">
        {state.watchlistMovie.length > 0 ? (
          state.watchlistMovie.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <h2>No Movie Available</h2>
        )}
      </div>
    </div>
  );
}

export default WatchList;
