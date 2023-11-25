import "./MoviePage.scss";
import Post from "../../components/Post/Post";
import uploadIcon from "../../assets/images/upload-review__icon.svg";
import backArrow from "../../assets/images/back_arrow.svg";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { priceToString } from "../../utils/formattingFunctions";

const MoviePage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("JWTtoken");

  const [movieData, setMovieData] = useState(null);
  const [moviePosts, setMoviePosts] = useState(null);
  const [userRating, setUserRating] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchMovieData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/movies/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMovieData(data);
        setUserRating(data.rating);
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/movies/${movieId}/posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMoviePosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieData();
  }, []);

  const updateUserRating = async (rating) => {
    if (userRating === rating) {
      return;
    }
    try {
      if (!userRating) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/posts`,
          {
            tmdb_id: movieData.id,
            caption: "",
            rating: rating,
            is_post: false,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserRating(response.data.rating);
        return;
      }
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/posts/${movieData.id}`,
        {
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserRating(response.data.rating);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostDelete = async (postId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMoviePosts(moviePosts.filter(({ id }) => id !== postId));
      setUserRating(null);
    } catch (error) {
      console.error(error);
    }
  };

  if (!(movieData && moviePosts && userData)) return null;

  if (!movieData.avg_rating) return null;

  const avgRating =
    movieData.avg_rating === 10 ? 10 : movieData.avg_rating.toFixed(1);

  let dateStr = new Date(movieData.release_date);
  dateStr = dateStr.toDateString();

  return (
    <main className="moviepage">
      <img
        src={backArrow}
        alt="back navigation button"
        className="moviepage__backarrow"
        onClick={() => navigate(-1)}
      />
      <div className="moviepage__wrapper">
        <section className="moviepage__hero">
          <header className="moviepage__header">
            <div className="moviepage__header-info">
              <h1 className="moviepage__header-info-title">
                {movieData.title}
              </h1>
              <h1 className="moviepage__header-info-date">
                ({movieData.release_date.split("-")[0]})
              </h1>
            </div>
            <div className="moviepage__score">
              <h1
                className={`${
                  avgRating >= 5
                    ? "moviepage__score--good"
                    : "moviepage__score--bad"
                }`}
              >
                {avgRating} / 10
              </h1>
            </div>
          </header>
          <img
            src={`https://image.tmdb.org/t/p/original${movieData.backdrop_path}`}
            alt={`backdrop of movie titled ${movieData.title}`}
          />
          <div className="moviepage__ratings">
            <button
              className={`moviepage__rating moviepage__rating--first ${
                userRating === 1 ? "moviepage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(1)}
              type="button"
            >
              1
            </button>
            <button
              className={`moviepage__rating ${
                userRating === 2 ? "moviepage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(2)}
              type="button"
            >
              2
            </button>
            <button
              className={`moviepage__rating ${
                userRating === 3 ? "moviepage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(3)}
              type="button"
            >
              3
            </button>
            <button
              className={`moviepage__rating ${
                userRating === 4 ? "moviepage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(4)}
              type="button"
            >
              4
            </button>
            <button
              className={`moviepage__rating ${
                userRating === 5 ? "moviepage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(5)}
              type="button"
            >
              5
            </button>
            <button
              className={`moviepage__rating ${
                userRating === 6 ? "moviepage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(6)}
              type="button"
            >
              6
            </button>
            <button
              className={`moviepage__rating ${
                userRating === 7 ? "moviepage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(7)}
              type="button"
            >
              7
            </button>
            <button
              className={`moviepage__rating ${
                userRating === 8 ? "moviepage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(8)}
              type="button"
            >
              8
            </button>
            <button
              className={`moviepage__rating ${
                userRating === 9 ? "moviepage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(9)}
              type="button"
            >
              9
            </button>
            <button
              className={`moviepage__rating moviepage__rating--last ${
                userRating === 10 ? "moviepage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(10)}
              type="button"
            >
              10
            </button>
          </div>
          <button
            type="button"
            className="moviepage__post-button"
            onClick={() => navigate(`/post/${movieData.id}`)}
          >
            Add a review <img src={uploadIcon} alt="upload new review icon" />
          </button>
        </section>
        <section className="moviepage__details">
          <article className="moviepage__overview">
            <h2>Overview</h2>
            <p>{movieData.overview}</p>
          </article>
          <section className="moviepage__info">
            <h2>Details</h2>
            <div className="moviepage__info-item">
              <h3>Genres: </h3>
              <p>{movieData.genres.map(({ name }) => name).join(", ")}</p>
            </div>
            <div className="moviepage__info-item">
              <h3>Release Date: </h3>
              <p> {dateStr}</p>
            </div>
            <div className="moviepage__info-item">
              <h3>Producer: </h3>
              <p>
                {
                  movieData.credits.crew.find(({ job }) => job === "Producer")
                    .name
                }
              </p>
            </div>
            <div className="moviepage__info-item">
              <h3>Director: </h3>
              <p>
                {
                  movieData.credits.crew.find(({ job }) => job === "Director")
                    .name
                }
              </p>
            </div>
            <div className="moviepage__info-item">
              <h3>Starring: </h3>
              <p>
                {movieData.credits.cast
                  .slice(0, 5)
                  .map((member) => `${member.name} (${member.character})`)
                  .join(", ")}
              </p>
            </div>
            <div className="moviepage__info-item">
              <h3>Runtime: </h3>
              <p>{movieData.runtime} minutes</p>
            </div>
            <div className="moviepage__info-item">
              <h3>Budget: </h3>
              <p>{priceToString(movieData.budget)}</p>
            </div>
            <div className="moviepage__info-item">
              <h3>Revenue: </h3>
              <p>{priceToString(movieData.revenue)}</p>
            </div>
          </section>
        </section>
        {moviePosts && moviePosts.length ? (
          <section className="moviepage__reviews">
            <h2>
              {moviePosts.length} Review{moviePosts.length === 1 ? "" : "s"}
            </h2>
            <div className="moviepage__review-container">
              {moviePosts.map((post) => {
                return (
                  <Post
                    key={post.id}
                    data={post}
                    userData={userData}
                    token={token}
                    handlePostDelete={handlePostDelete}
                  />
                );
              })}
            </div>
          </section>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
};

export default MoviePage;
