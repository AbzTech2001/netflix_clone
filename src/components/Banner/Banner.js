import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../../axios";
import requests from "../../Requests";
const Banner = () => {
  //fetching a data from tmdb
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  console.log(movie);
  //used to show limited description  of the movie in banner
  // function truncate(string, n) {
  //   return string.length > n ? string.substring(0, n - 3) + "..." : string;
  // }
  function truncate(string, n) {
    // Check if string is defined and is a string
    if (typeof string !== "string") {
      return string; // or handle appropriately
    }
    return string.length > n ? string.substring(0, n - 1) + "...." : string;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My list</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner_fadeButton" />
    </header>
  );
};

export default Banner;
