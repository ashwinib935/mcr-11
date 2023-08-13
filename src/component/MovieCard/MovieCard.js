import React from "react";
import "./MovieCard.css";
import { useMovie } from "../../context/MovieProvider";
import { useNavigate } from "react-router";
function MovieCard({ movie }) {
  const { state, dispatch } = useMovie();
  const navigate = useNavigate();
  const handleStar = (movie) => {
    dispatch({ type: "ADD_TO_STAR", payload: movie });
  };
  const handleWatchlist = (movie) => {
    dispatch({ type: "ADD_TO_WATCHLIST", payload: movie });
  };
  const starredMovie = JSON.parse(localStorage.getItem("starredMovie"));
  const watchlistMovie = JSON.parse(localStorage.getItem("watchlistMovie"));

  const isPresentInStaredMovie = starredMovie?.findIndex(
    (mov) => mov.id === movie.id
  );

  const isPresentInWatchlistMovie = watchlistMovie?.findIndex(
    (mov) => mov.id === movie.id
  );

  return (
    <div
      className="moviecard"
      onClick={() => navigate(`/movieDetail/${movie.id}`)}
    >
      <img src={movie.imageURL} alt="" className="moviecard-img" />
      <h2>{movie.title}</h2>
      <p>{movie.summary}</p>
      <div className="btn-container">
        {isPresentInStaredMovie > -1 ? (
          <button
            className="btn-action"
            onClick={() => navigate("/starred-movie")}
          >
            Starred
          </button>
        ) : (
          <button className="btn-action" onClick={() => handleStar(movie)}>
            Star
          </button>
        )}
        {isPresentInWatchlistMovie > -1 ? (
          <button className="btn-action" onClick={() => navigate("/watchlist")}>
            Added to Watchlist
          </button>
        ) : (
          <button className="btn-action" onClick={() => handleWatchlist(movie)}>
            Add to Watchlist
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;
