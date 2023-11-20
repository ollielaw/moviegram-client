import "./MoviePage.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MoviePage = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState(null);
  const [moviePosts, setMoviePosts] = useState(null);

  const token = sessionStorage.getItem("JWTtoken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, []);

  if (!(movieData && moviePosts)) return null;

  return <></>;
};

export default MoviePage;
