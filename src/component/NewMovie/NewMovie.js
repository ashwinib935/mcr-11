import React, { useState } from "react";
import { useMovie } from "../../context/MovieProvider";
import "./NewMovie.css";
function NewMovie({ setShouldDisplay }) {
  const [newMovie, setNewMovie] = useState({
    id: "",
    title: "",
    year: "",
    genre: [],
    rating: 0,
    director: "",
    writer: "",
    cast: [],
    summary: "",
    imageURL: "",
  });
  const years = [
    1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
    2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
    2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2013,
  ];
  const ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const { state, dispatch } = useMovie();
  const handleAdd = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_MOVIE", payload: newMovie });
    setShouldDisplay(false);
  };
  return (
    <div className="newmovie">
      <form className="newmovie-form">
        <h1>New Movie</h1>
        <label htmlFor="">
          Title
          <input
            type="text"
            onChange={(e) =>
              setNewMovie({ ...newMovie, title: e.target.value })
            }
          />
        </label>

        <label htmlFor="">
          Summary
          <input
            type="text"
            onChange={(e) =>
              setNewMovie({ ...newMovie, summary: e.target.value })
            }
          />
        </label>

        <label htmlFor="">
          Year
          <select
            name=""
            id=""
            onChange={(e) =>
              setNewMovie({ ...newMovie, year: Number(e.target.value) })
            }
          >
            <option value="Release Year">Release Year</option>
            {years.map((year, i) => (
              <option value={year} key={i}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="">
          Cast
          <input
            type="text"
            onChange={(e) =>
              setNewMovie({ ...newMovie, cast: [e.target.value] })
            }
          />
        </label>

        <label htmlFor="">
          Genre
          <select
            name=""
            id=""
            onChange={(e) =>
              setNewMovie({ ...newMovie, genre: [e.target.value] })
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
        </label>

        <label htmlFor="">
          Rating
          <select
            name=""
            id=""
            onChange={(e) =>
              setNewMovie({ ...newMovie, rating: Number(e.target.value) })
            }
          >
            <option value="Rating">Rating</option>
            {ratings.map((rating, i) => (
              <option key={i} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="">
          Director
          <input
            type="text"
            onChange={(e) =>
              setNewMovie({ ...newMovie, director: e.target.value })
            }
          />
        </label>

        <label htmlFor="">
          Writter
          <input
            type="text"
            onChange={(e) =>
              setNewMovie({ ...newMovie, writer: e.target.value })
            }
          />
        </label>

        <label htmlFor="">
          ImageUrl
          <input
            type="text"
            onChange={(e) =>
              setNewMovie({ ...newMovie, imageURL: e.target.value })
            }
          />
        </label>
        <button onClick={() => setShouldDisplay(false)}>Cancel</button>
        <button onClick={handleAdd}>Add</button>
      </form>
    </div>
  );
}

export default NewMovie;
