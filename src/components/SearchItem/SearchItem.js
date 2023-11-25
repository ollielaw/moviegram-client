import "./SearchItem.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import uploadIcon from "../../assets/images/upload-review__icon.svg";
import { Link, useNavigate } from "react-router-dom";

const SearchItem = ({ category, data, isPost, token }) => {
  const navigate = useNavigate();
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    setUserRating(data.rating);
  }, [data.rating]);

  const updateUserRating = async (rating) => {
    if (userRating === rating) {
      return;
    }
    try {
      if (!userRating) {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/posts`,
          {
            tmdb_id: data.id,
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
        `${process.env.REACT_APP_API_URL}/api/posts/${data.id}`,
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

  const handlePostNav = async () => {
    navigate(`${data.id}`);
  };

  if (category === "people") {
    return (
      <Link to={`users/${data.id}`} className="user__wrapper">
        <article className="user">
          <img
            src={data.avatar_url}
            alt={`avatar of ${data.name}`}
            className="user__avatar"
          />
          <div className="user__info">
            <div className="user__info-names">
              <h3>
                {data.name} ({data.username})
              </h3>
            </div>
            <h4 className="user__info-reviews">
              {data.num_posts ? data.num_posts : "0"} review
              {data.num_posts === 1 ? "" : "s"}
            </h4>
          </div>
        </article>
      </Link>
    );
  } else {
    if (!data.avg_rating) return null;
    const avgRating = data.avg_rating === 10 ? 10 : data.avg_rating.toFixed(1);
    return (
      <article className="movie">
        <Link to={`/search/movies/${data.id}`} className="movie__poster">
          <img
            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
            alt={`poster of ${data.title}`}
          />
        </Link>
        <div className="movie__section">
          <div className="movie__info">
            <Link
              to={`/search/movies/${data.id}`}
              className="movie__info-title"
            >
              <h2>{data.title}</h2>
            </Link>
            <h2 className="movie__info-date">
              {data.release_date.split("-")[0]}
            </h2>
          </div>
          <div className="movie__ratings">
            <button
              className={`movie__rating movie__rating--first ${
                userRating === 1 ? "movie__rating--active" : ""
              }`}
              onClick={() => updateUserRating(1)}
              type="button"
            >
              1
            </button>
            <button
              className={`movie__rating ${
                userRating === 2 ? "movie__rating--active" : ""
              }`}
              onClick={() => updateUserRating(2)}
              type="button"
            >
              2
            </button>
            <button
              className={`movie__rating ${
                userRating === 3 ? "movie__rating--active" : ""
              }`}
              onClick={() => updateUserRating(3)}
              type="button"
            >
              3
            </button>
            <button
              className={`movie__rating ${
                userRating === 4 ? "movie__rating--active" : ""
              }`}
              onClick={() => updateUserRating(4)}
              type="button"
            >
              4
            </button>
            <button
              className={`movie__rating ${
                userRating === 5 ? "movie__rating--active" : ""
              }`}
              onClick={() => updateUserRating(5)}
              type="button"
            >
              5
            </button>
            <button
              className={`movie__rating ${
                userRating === 6 ? "movie__rating--active" : ""
              }`}
              onClick={() => updateUserRating(6)}
              type="button"
            >
              6
            </button>
            <button
              className={`movie__rating ${
                userRating === 7 ? "movie__rating--active" : ""
              }`}
              onClick={() => updateUserRating(7)}
              type="button"
            >
              7
            </button>
            <button
              className={`movie__rating ${
                userRating === 8 ? "movie__rating--active" : ""
              }`}
              onClick={() => updateUserRating(8)}
              type="button"
            >
              8
            </button>
            <button
              className={`movie__rating ${
                userRating === 9 ? "movie__rating--active" : ""
              }`}
              onClick={() => updateUserRating(9)}
              type="button"
            >
              9
            </button>
            <button
              className={`movie__rating movie__rating--last ${
                userRating === 10 ? "movie__rating--active" : ""
              }`}
              onClick={() => updateUserRating(10)}
              type="button"
            >
              10
            </button>
          </div>
        </div>
        {isPost ? (
          <button
            className="movie__upload"
            type="button"
            onClick={handlePostNav}
          >
            <img src={uploadIcon} alt="post icon" />
          </button>
        ) : (
          <div className="movie__score">
            <h2
              className={`${
                avgRating >= 5 ? "movie__score--good" : "movie__score--bad"
              }`}
            >
              {avgRating} / 10
            </h2>
          </div>
        )}
      </article>
    );
  }
};

export default SearchItem;
