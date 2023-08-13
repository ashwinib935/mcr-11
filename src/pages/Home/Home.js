import React, { useState } from "react";
import Header from "../../component/Header/Header";
import "./Home.css";
import { useMovie } from "../../context/MovieProvider";
import MovieCard from "../../component/MovieCard/MovieCard";
import { useNavigate } from "react-router";
import NewMovie from "../../component/NewMovie/NewMovie";
function Home() {
  const { state, dispatch, filteredMovie } = useMovie();
  const [shouldDisplay, setShouldDisplay] = useState(false);
  const navigate = useNavigate();
  const years = [
    1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
    2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
    2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2013,
  ];
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <Header />
      <div className="movie-header">
        <h1>Movies</h1>
        <select
          name=""
          id=""
          onChange={(e) =>
            dispatch({ type: "SELECTED_GENRE", payload: e.target.value })
          }
        >
          <option value="All Genere">All Genere</option>
          <option value="Drama">Drama</option>
          <option value="Crime">Crime</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Biography">Biography</option>
        </select>

        <select
          name=""
          id=""
          onChange={(e) =>
            dispatch({ type: "SELECTED_YEAR", payload: e.target.value })
          }
        >
          <option value="Release Year">Release Year</option>
          {years.map((year, i) => (
            <option value={year} key={i}>
              {year}
            </option>
          ))}
        </select>

        <select
          name=""
          id=""
          onChange={(e) =>
            dispatch({
              type: "SELECTED_RATING",
              payload: e.target.value,
            })
          }
        >
          <option value="Rating">Rating</option>
          {ratings.map((rating, i) => (
            <option key={i} value={rating}>
              {rating}
            </option>
          ))}
        </select>
        <button className="btn-action" onClick={() => setShouldDisplay(true)}>
          Add a Movie
        </button>
      </div>
      <div className="movie-container">
        {filteredMovie.length > 0 ? (
          filteredMovie.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <h2>No Movie Available</h2>
        )}
      </div>
      {shouldDisplay ? <NewMovie setShouldDisplay={setShouldDisplay} /> : null}
    </div>
  );
}

export default Home;
