import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home/Home";
import WatchList from "./pages/WatchList/Watchlist";
import Starmovie from "./pages/Starmovie/Starmovie";
import MovieDetail from "./component/MovieDetail/MovieDetail";
import NewMovie from "./component/NewMovie/NewMovie";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<WatchList />} />
        <Route path="/starred-movie" element={<Starmovie />} />
        <Route path="/movieDetail/:movieId" element={<MovieDetail />} />
        {/* <Route path="/newMovie" element={<NewMovie />} /> */}
      </Routes>
    </div>
  );
}

export default App;
