import { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import MovieCard from "../src/MovieCard";
import Filter from "../src/Filter";
import YoutubeContainer from "../src/YoutibeContainer";

export default function App() {
  const movie_api_url = "https://peaceful-forest-62260.herokuapp.com";
  const [movieList, setMovieList] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [selectedMovie, setselectedMovie] = useState([]);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [showContainer, setShowContainer] = useState(true);
  const [language, setLanguage] = useState("");
  const [genreData, setGenreData] = useState("");

  //Fetch movie data from api
  const fetchMovies = async () => {
    try {
      const movieData = await axios.get(movie_api_url);
      setMovieList(movieData.data.moviesData);
      setselectedMovie(Object.values(movieData.data.moviesData)[0]);
    } catch (err) {
      console.log(err);
    }
  };

  //fetch movie function
  useEffect(() => {
    fetchMovies();
  }, []);

  // useEffect to set flags to show container and play trailer button
  // Called only when any movie is selected
  useEffect(() => {
    setPlayTrailer(false);
    setShowContainer(true);
  }, [selectedMovie]);

  // useEffect to set flags only if any value is typed in search input field
  // flag showContainer is used to mount or unmount container div
  useEffect(() => {
    if (searchKey !== "") {
      setShowContainer(false);
    } else if (searchKey === "") {
      setShowContainer(true);
    }
  }, [searchKey]);

  // Functions called from child component (Filter component)
  // flag to set selected Language from drop down
  const setLanguageData = (data) => {
    setLanguage(data);
  };

  // Functions called from child component (Filter component)
  // flag to set selected Genre from drop down
  const setGenreData = (data) => {
    setGenreData(data);
  };

  const languageFilter = () => {
    return Object.keys(movieList).filter(
      (value) =>
        (language === "" ||
          language.toLowerCase() ===
            movieList[value].EventLanguage.toLowerCase()) &&
        (genreData === "" ||
          genreData
            .toLowerCase()
            .includes(movieList[value].EventGenre.toLowerCase()))
    );
  };

  const genreFilter = () => {
    return Object.keys(movieList).filter((value) => {
      if (searchKey === "") {
        return value;
      } else if (
        movieList[value].EventTitle.toLowerCase().includes(
          searchKey.toLowerCase()
        )
      ) {
        return value;
      }
    });
  };

  const filteredData =
    language === "" && genreData === "" ? genreFilter() : languageFilter();

  return (
    <div className="App">
      <header className="header">
        <div className={"header-content"}>
          <h1 className="header-content">Movie Trailers</h1>
          <input
            className="search_filter"
            type="text"
            placeholder="Search movies"
            onChange={(event) => {
              setSearchKey(event.target.value);
            }}
          />
        </div>
      </header>
      <div className="filter_and_container">
        <Filter
          movieFilter={movieList}
          callBackFunc={setLanguageData}
          setGenre={setGenreData}
        />

        {showContainer && (
          <div
            className="trailer_container"
            style={{ backgroundImage: `url(${selectedMovie.EventImageUrl})` }}
          >
            <YoutubeContainer
              playTrailerFlag={playTrailer}
              setPlayerFlag={setPlayTrailer}
              selectedMovies={selectedMovie}
            />
          </div>
        )}
      </div>
      <div className={"container max-center"}>
        {filteredData.map((item, i) => (
          <MovieCard
            key={i}
            movie={movieList[item]}
            selectMovie={setselectedMovie}
          />
        ))}
      </div>
    </div>
  );
}
