import React from "react";
import Header from "../Header/Header";
import "./MovieDetail.css";
import { useParams } from "react-router";
import { useMovie } from "../../context/MovieProvider";

function MovieDetail() {
  const { movieId } = useParams();
  const { state, dispatch } = useMovie();
  const selectedMovie = [...state.movies].find(
    (movie) => movie.id === Number(movieId)
  );
  const starredMovie = JSON.parse(localStorage.getItem("starredMovie"));
  const watchlistMovie = JSON.parse(localStorage.getItem("watchlistMovie"));

  const isPresentInStaredMovie = starredMovie?.findIndex(
    (mov) => mov.id === selectedMovie.id
  );

  const isPresentInWatchlistMovie = watchlistMovie?.findIndex(
    (mov) => mov.id === selectedMovie.id
  );
  const handleStar = (movie) => {
    dispatch({ type: "ADD_TO_STAR", payload: movie });
  };
  const handleWatchlist = (movie) => {
    dispatch({ type: "ADD_TO_WATCHLIST", payload: movie });
  };
  const handleRemoveStar = (id) => {
    dispatch({ type: "REMOVE_STAR", payload: id });
  };
  const handleRemoveWatchList = (id) => {
    dispatch({ type: "REMOVE_WATCHLIST", payload: id });
  };
  return (
    <div>
      <Header />
      <div className="movie-detail">
        <img src={selectedMovie.imageURL} alt="" />
        <div className="detail">
          <h2>{selectedMovie.title}</h2>
          <p>{selectedMovie.summary}</p>
          <p>Year: {selectedMovie.year}</p>
          <p>Gener:{selectedMovie.genre}</p>
          <p>Rating:{selectedMovie.rating}</p>
          <p>Director:{selectedMovie.director}</p>
          <p>Writer:{selectedMovie.writer}</p>
          <p>Cast:{selectedMovie.cast}</p>
          <div className="btn-container">
            {isPresentInStaredMovie > -1 ? (
              <button
                className="btn-action"
                onClick={() => handleRemoveStar(selectedMovie.id)}
              >
                Starred
              </button>
            ) : (
              <button
                className="btn-action"
                onClick={() => handleStar(selectedMovie)}
              >
                Star
              </button>
            )}
            {isPresentInWatchlistMovie > -1 ? (
              <button
                className="btn-action"
                onClick={() => handleRemoveWatchList(selectedMovie.id)}
              >
                Added to Watchlist
              </button>
            ) : (
              <button
                className="btn-action"
                onClick={() => handleWatchlist(selectedMovie)}
              >
                Add to Watchlist
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
