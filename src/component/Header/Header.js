import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";
import { useMovie } from "../../context/MovieProvider";
function Header() {
  const handleIsActive = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "",
    };
  };
  const { state, dispatch } = useMovie();
  return (
    <div className="header">
      <nav className="nav-container">
        <NavLink to="/" className="nav-link" style={handleIsActive}>
          IMDB
        </NavLink>
        <input
          type="text"
          placeholder="Search movie by title, cast or director"
          className="search-input"
          onChange={(e) =>
            dispatch({ type: "SEARCH", payload: e.target.value })
          }
        />
        <div>
          <NavLink to="/" className="nav-link" style={handleIsActive}>
            Movies
          </NavLink>
          <NavLink to="/watchlist" className="nav-link" style={handleIsActive}>
            Watch List
          </NavLink>
          <NavLink
            to="/starred-movie"
            className="nav-link"
            style={handleIsActive}
          >
            Starred Movie
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Header;
