import "./SearchPage.scss";
import searchIcon from "../../assets/images/search-bar__icon.svg";
import SearchItem from "../../components/SearchItem/SearchItem";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchPage = ({ isPost }) => {
  const navigate = useNavigate();
  const [searchCategory, setSearchCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [page, setPage] = useState(2);
  const token = sessionStorage.getItem("JWTtoken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    setSearchQuery("");
    const fetchInitialResults = async () => {
      if (isPost) {
        setSearchCategory("movies");
        const results = await searchMovies(1);
        setSearchResults(results);
      } else {
        setSearchCategory("people");
        const results = await searchPeople(1);
        setSearchResults(results);
      }
    };
    fetchInitialResults();
  }, [isPost]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(2);
    if (searchCategory === "people") {
      const results = await searchPeople(1);
      setSearchResults(results);
    } else {
      const results = await searchMovies(1);
      setSearchResults(results);
    }
  };

  const searchPeople = async (page) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/profiles?s=${searchQuery}&p=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const searchMovies = async (page) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/movies?s=${searchQuery}&p=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoad = async () => {
    if (searchCategory === "people") {
      const newResults = await searchPeople(page);
      setPage(page + 1);
      setSearchResults([...searchResults, ...newResults]);
    } else {
      const newResults = await searchMovies(page);
      setPage(page + 1);
      setSearchResults([...searchResults, ...newResults]);
    }
  };

  const updateCategory = async (category) => {
    setSearchQuery("");
    setSearchCategory(category);
    setPage(2);
    if (category === "people") {
      const results = await searchPeople(1);
      setSearchResults(results);
    } else {
      const results = await searchMovies(1);
      setSearchResults(results);
    }
  };

  if (!(searchCategory && searchResults)) return null;

  return (
    <main className="search">
      <form className="search__form" onSubmit={handleSearch}>
        <div className="search__bar">
          <input
            type="text"
            placeholder="Search MovieGram..."
            name="query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search__button">
            <img
              src={searchIcon}
              alt="search button icon"
              className="search__icon"
            />
          </button>
        </div>
        {isPost ? (
          <></>
        ) : (
          <div className="search__categories">
            <button
              type="button"
              className={`search__category search__category--first ${
                searchCategory === "people" ? "search__category--active" : ""
              }`}
              onClick={() => updateCategory("people")}
            >
              People
            </button>
            <button
              type="button"
              className={`search__category search__category--last ${
                searchCategory === "movies" ? "search__category--active" : ""
              }`}
              onClick={() => updateCategory("movies")}
            >
              Movies
            </button>
          </div>
        )}
      </form>
      {!searchResults ? (
        <></>
      ) : (
        <div className="search__results">
          {searchResults.map((result) => {
            return (
              <SearchItem
                key={result.id}
                category={searchCategory}
                data={result}
                isPost={isPost}
                token={token}
              />
            );
          })}
          <button type="button" className="feed__button" onClick={handleLoad}>
            Load More
          </button>
        </div>
      )}
    </main>
  );
};

export default SearchPage;
