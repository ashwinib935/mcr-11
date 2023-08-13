import React, { createContext, useContext, useEffect, useReducer } from "react";
import { movies } from "../data/movieData";

export const MovieContext = createContext();
const handleMovie = (state, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return { ...state, movies: [...action.payload] };
    case "SET_STARRED_MOVIES":
      return { ...state, starredMovie: [...action.payload] };
    case "SET_WATCHLIST_MOVIES":
      return { ...state, watchlistMovie: [...action.payload] };
    case "SEARCH":
      return { ...state, searchValue: action.payload };
    case "SELECTED_GENRE":
      return { ...state, selectedGenre: action.payload };
    case "SELECTED_YEAR":
      return { ...state, selectedYear: action.payload };
    case "SELECTED_RATING":
      return { ...state, selectedRating: action.payload };
    case "ADD_TO_STAR": {
      const selectedMovie = action.payload;

      const newStarredMovieList = [...state.starredMovie];
      newStarredMovieList.push(selectedMovie);
      localStorage.setItem("starredMovie", JSON.stringify(newStarredMovieList));
      return { ...state, starredMovie: newStarredMovieList };
    }
    case "ADD_TO_WATCHLIST": {
      const selectedMovie = action.payload;

      const newWatchlistMovieList = [...state.starredMovie];
      newWatchlistMovieList.push(selectedMovie);
      localStorage.setItem(
        "watchlistMovie",
        JSON.stringify(newWatchlistMovieList)
      );
      return { ...state, watchlistMovie: newWatchlistMovieList };
    }
    case "ADD_MOVIE":
      const newlyAddedMovie = action.payload;
      const length = state.movies.length;
      newlyAddedMovie.id = length + 1;
      const newMovieList = [...state.movies];
      newMovieList.push(newlyAddedMovie);
      localStorage.setItem("movies", JSON.stringify(newMovieList));
      return { ...state, movies: newMovieList };
    case "REMOVE_STAR": {
      const newStrredList = [...state.starredMovie].filter(
        (movie) => movie.id !== action.payload
      );
      localStorage.setItem("starredMovie", JSON.stringify(newStrredList));
      return { ...state, starredMovie: newStrredList };
    }
    case "REMOVE_WATCHLIST": {
      const newWatchList = [...state.watchlistMovie].filter(
        (movie) => movie.id !== action.payload
      );
      localStorage.setItem("watchlistMovie", JSON.stringify(newWatchList));
      return { ...state, watchlistMovie: newWatchList };
    }

    default:
      return state;
  }
};
function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(handleMovie, {
    movies: movies,
    searchValue: "",
    selectedGenre: "All Genere",
    selectedYear: "Release Year",
    selectedRating: "Rating",
    starredMovie: [],
    watchlistMovie: [],
  });

  useEffect(() => {
    const existingMovie = localStorage.getItem("movies");
    if (existingMovie) {
      dispatch({
        type: "SET_MOVIES",
        payload: JSON.parse(existingMovie),
      });
    } else {
      dispatch({ type: "SET_MOVIES", payload: movies });
    }
    const existingStarredMovie = localStorage.getItem("starredMovie");
    if (existingStarredMovie) {
      dispatch({
        type: "SET_STARRED_MOVIES",
        payload: JSON.parse(existingStarredMovie),
      });
    }
    const existingWatchlistMovie = localStorage.getItem("watchlistMovie");
    if (existingWatchlistMovie) {
      dispatch({
        type: "SET_WATCHLIST_MOVIES",
        payload: JSON.parse(existingWatchlistMovie),
      });
    }
  }, []);

  const applyFilter = (movies) => {
    let filterdMovieList = [...movies];
    if (state.searchValue.length > 0) {
      filterdMovieList = [...filterdMovieList].filter(
        (movie) =>
          movie.title
            .toLowerCase()
            .includes(state.searchValue.toLowerCase().trim()) ||
          movie.director
            .toLowerCase()
            .includes(state.searchValue.toLowerCase().trim()) ||
          movie.cast.some(
            (ele) =>
              ele.toLowerCase() === state.searchValue.toLowerCase().trim()
          )
      );
    }

    if (state.selectedGenre !== "All Genere") {
      filterdMovieList = [...filterdMovieList].filter((movie) =>
        movie.genre.some((gen) => gen === state.selectedGenre)
      );
    }
    if (state.selectedYear !== "Release Year") {
      filterdMovieList = [...filterdMovieList].filter(
        (movie) => movie.year === Number(state.selectedYear)
      );
    }

    if (state.selectedRating !== "Rating") {
      filterdMovieList = [...filterdMovieList].filter(
        (movie) => movie.rating === Number(state.selectedRating)
      );
    }
    return filterdMovieList;
  };
  const filteredMovie = applyFilter(state.movies);

  return (
    <MovieContext.Provider value={{ state, dispatch, filteredMovie }}>
      {children}
    </MovieContext.Provider>
  );
}

export const useMovie = () => useContext(MovieContext);
export default MovieProvider;
