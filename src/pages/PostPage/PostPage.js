import "./PostPage.scss";
import backArrow from "../../assets/images/back_arrow.svg";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const PostPage = () => {
  const navigate = useNavigate();
  const { movieId } = useParams();

  const token = sessionStorage.getItem("JWTtoken");

  const prevPostDefaults = {
    id: null,
    caption: "",
    rating: null,
    is_post: 1,
    movie_name: "",
    tmdb_id: movieId,
    poster_url: null,
    release_date: "",
  };

  const [isUpdate, setIsUpdate] = useState(false);
  const [prevPostData, setPrevPostData] = useState(prevPostDefaults);
  const [ratingError, setRatingError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchPostData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/posts/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data) {
          setIsUpdate(true);
          setPrevPostData({
            ...prevPostData,
            id: data.id,
            caption: data.caption,
            rating: data.rating,
            movie_name: data.movie_name,
            poster_url: data.poster_url,
            release_date: data.release_date,
          });
        } else {
          setIsUpdate(false);
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/movies/${movieId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const { title, poster_path, release_date } = res.data;
          setPrevPostData({
            ...prevPostData,
            movie_name: title,
            poster_url: poster_path,
            release_date,
          });
        }
      } catch (error) {
        if (error.response.data.error === "TokenExpiredError: jwt expired") {
          sessionStorage.removeItem("JWTtoken");
          sessionStorage.removeItem("currUserId");
          sessionStorage.removeItem("display");
          navigate("/login");
        }
        console.error(error);
      }
    };
    fetchPostData();
  }, []);

  const updateUserRating = (rating) => {
    setPrevPostData({
      ...prevPostData,
      rating,
    });
  };

  const handleNewPost = async (e) => {
    e.preventDefault();
    if (!prevPostData.rating) {
      setRatingError("Must select a rating for the movie review.");
      return;
    }
    setRatingError("");
    try {
      const { caption, rating, is_post, tmdb_id, movie_name } = prevPostData;
      const newReview = {
        caption,
        rating,
        is_post,
        tmdb_id,
      };
      if (isUpdate) {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/api/posts/${tmdb_id}`,
          newReview,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        window.alert(`Successfully updated review of ${movie_name}`);
        navigate("/");
        return;
      }
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/posts`,
        newReview,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.alert(`Successfully shared new review of ${movie_name}`);
      navigate("/");
      return;
    } catch (error) {
      if (error.response.data.error === "TokenExpiredError: jwt expired") {
        sessionStorage.removeItem("JWTtoken");
        sessionStorage.removeItem("currUserId");
        sessionStorage.removeItem("display");
        navigate("/login");
      }
      console.error(error);
    }
  };

  if (!prevPostData.poster_url) return null;

  return (
    <main className="postpage">
      <img
        src={backArrow}
        alt="back navigation button"
        className="postpage__backarrow"
        onClick={() => navigate(-1)}
      />
      <div className="postpage__wrapper">
        <section className="postpage__movie">
          <header className="postpage__movie-info">
            <h2 className="postpage__movie-info-title">
              {prevPostData.movie_name}
            </h2>
            <h2 className="postpage__movie-info-date">
              {prevPostData.release_date.split("-")[0]}
            </h2>
          </header>
          <img
            className="postpage__movie-poster"
            alt={`poster of ${prevPostData.movie_name}`}
            src={`https://image.tmdb.org/t/p/original${prevPostData.poster_url}`}
          />
        </section>
        <form className="postpage__form" onSubmit={handleNewPost}>
          <h1 className="postpage__form-title">Share your thoughts</h1>
          {ratingError && (
            <div className="postpage__message">{ratingError}</div>
          )}
          <h2 className="postpage__rating-label">Select a rating:</h2>
          <div className="postpage__ratings">
            <button
              className={`postpage__rating postpage__rating--first ${
                prevPostData.rating === 1 ? "postpage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(1)}
              type="button"
            >
              1
            </button>
            <button
              className={`postpage__rating ${
                prevPostData.rating === 2 ? "postpage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(2)}
              type="button"
            >
              2
            </button>
            <button
              className={`postpage__rating ${
                prevPostData.rating === 3 ? "postpage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(3)}
              type="button"
            >
              3
            </button>
            <button
              className={`postpage__rating ${
                prevPostData.rating === 4 ? "postpage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(4)}
              type="button"
            >
              4
            </button>
            <button
              className={`postpage__rating ${
                prevPostData.rating === 5 ? "postpage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(5)}
              type="button"
            >
              5
            </button>
            <button
              className={`postpage__rating ${
                prevPostData.rating === 6 ? "postpage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(6)}
              type="button"
            >
              6
            </button>
            <button
              className={`postpage__rating ${
                prevPostData.rating === 7 ? "postpage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(7)}
              type="button"
            >
              7
            </button>
            <button
              className={`postpage__rating ${
                prevPostData.rating === 8 ? "postpage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(8)}
              type="button"
            >
              8
            </button>
            <button
              className={`postpage__rating ${
                prevPostData.rating === 9 ? "postpage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(9)}
              type="button"
            >
              9
            </button>
            <button
              className={`postpage__rating postpage__rating--last ${
                prevPostData.rating === 10 ? "postpage__rating--active" : ""
              }`}
              onClick={() => updateUserRating(10)}
              type="button"
            >
              10
            </button>
          </div>
          <textarea
            className="postpage__review"
            value={prevPostData.caption}
            onChange={(e) =>
              setPrevPostData({ ...prevPostData, caption: e.target.value })
            }
            placeholder="Write a review (optional)"
            rows={6}
            name="caption"
            autoComplete="off"
          />
          <div className="postpage__button-container">
            <button
              type="button"
              className="postpage__button-cancel"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button className="postpage__button-share">Share</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default PostPage;
