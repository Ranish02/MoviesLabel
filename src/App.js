import { useEffect, useState } from "react";
import React from 'react';
import './App.css';
import SearchIcon from './search.svg'
import Movies from "./Movies";
// 754cd9ba
const API_URL = 'http://www.omdbapi.com?apikey=754cd9ba';
//same data below 
//const movie1 = {
//   "Title": "Avengers: Infinity War",
//   "Year": "2018",
//   "imdbID": "tt4154756",
//   "Type": "movie",
//   "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
// };
function App() {
  const [movies, setmovies] = useState([]);
  const [typedtext, settypedtext] = useState();
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();
    //console.log(data.Search);
    setmovies(data.Search);
  }
  const handletyping = (event) => {
    var texttyped = event.target.value;
    //console.log(texttyped);
    settypedtext(texttyped);
  };
  const handlesearch = () => {
    searchMovies(typedtext);
  };


  useEffect(() => {
    searchMovies('avengers');
  }, [])
  return (
    <div className="app">
      <h1>Movies</h1>
      <div className="search">
        <input type="text" onChange={handletyping} />
        <img
          src={SearchIcon}
          alt="Search"
          onClick={handlesearch}
        />
      </div>
      {
        movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie) => (< Movies key={movie.imdbID} movie={movie} />)
            )}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )
      };


    </div>
  );
}

export default App;
