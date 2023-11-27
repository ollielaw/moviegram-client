import "./Post.scss";
import Comment from "../Comment/Comment";
import DeleteModal from "../DeleteModal/DeleteModal";
import likeEmptyIcon from "../../assets/images/like_empty_icon.svg";
import likeFullIcon from "../../assets/images/like_full_blue_icon.svg";
import commentIcon from "../../assets/images/comment_icon.svg";
import postIcon from "../../assets/images/upload_icon.svg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { timestampToDynamic } from "../../utils/formattingFunctions";

const Post = ({ data, isBackdrop, userData, token, handlePostDelete }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState(null);
  const [isCommentsExpanded, setIsCommentsExapnded] = useState(false);
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(data.user_liked);
  const [numLikes, setNumLikes] = useState(data.num_likes);

  const isUserPost = data.user_id === userData.id;

  const isCommentValid = () => {
    return Boolean(comment);
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/posts/${data.id}/comments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.data.length) {
          return;
        }
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, []);

  const showComments = async () => {
    if (comments && comments.length) {
      setIsCommentsExapnded(true);
    }
  };

  const handleNewComment = async (e) => {
    e.preventDefault();
    if (!isCommentValid()) {
      return;
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/posts/${data.id}/comments`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/posts/${data.id}/comments`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsCommentsExapnded(true);
      setComments(response.data);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewPost = () => {
    setComment("");
    navigate(`/post/${data.tmdb_id}`);
  };

  const handleLike = async () => {
    try {
      if (isLiked) {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/posts/${data.id}/like`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLiked(false);
        setNumLikes(numLikes - 1);
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/posts/${data.id}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLiked(true);
        setNumLikes(numLikes + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/posts/${data.id}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (comments.length === 1) {
        setIsCommentsExapnded(false);
        setComments(null);
        return;
      }
      setComments(comments.filter(({ id }) => id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="post">
      <header className="post__header">
        <div className="post__header-container">
          <Link to={`/search/users/${data.user_id}`}>
            <img
              className="post__avatar avatar"
              src={data.avatar_url}
              alt={`avatar of ${data.name}`}
            />
          </Link>
          <Link to={`/search/users/${data.user_id}`}>
            <h3 className="post__username">{data.username}</h3>
          </Link>
          {isUserPost && (
            <>
              <button
                type="button"
                className="post__edit"
                onClick={() => navigate(`/post/${data.tmdb_id}`)}
              >
                Edit
              </button>
              <DeleteModal
                isPost={true}
                handleDelete={handlePostDelete}
                data={data}
              />
            </>
          )}
        </div>
        <h3 className="post__timestamp">
          {timestampToDynamic(Date.parse(data.created_at))}
        </h3>
      </header>
      {isBackdrop ? (
        <section className="post__title">
          <Link to={`/search/movies/${data.tmdb_id}`}>
            <h2>{data.movie_name}</h2>
          </Link>
        </section>
      ) : (
        <></>
      )}
      <Link
        className="post__poster-wrapper"
        to={`/search/movies/${data.tmdb_id}`}
      >
        <img
          src={
            isBackdrop
              ? `https://image.tmdb.org/t/p/original${data.backdrop_url}`
              : `https://image.tmdb.org/t/p/original${data.poster_url}`
          }
          alt={`poster of ${data.movie_name}`}
          className={`post__poster ${isBackdrop ? "post__poster--bd" : ""}`}
        />
      </Link>
      <div className="post__rating-section">
        <h1
          className={
            data.rating >= 5 ? "post__rating--good" : "post__rating--bad"
          }
        >
          {data.rating} / 10
        </h1>
      </div>
      <div className="post__cta-section">
        <div className="post__icon-container">
          <img
            className="post__icon post__icon--first"
            src={isLiked ? likeFullIcon : likeEmptyIcon}
            alt="like button"
            onClick={handleLike}
          />
          <img
            className="post__icon"
            src={commentIcon}
            alt="comment button"
            onClick={showComments}
          />
          <img
            className="post__icon post__icon--last"
            src={postIcon}
            alt="post button"
            onClick={handleNewPost}
          />
        </div>
        <h3 className="post__like-cnt">
          {numLikes === 1 ? "1 like" : `${numLikes} likes`}
        </h3>
      </div>
      <div className="post__review-section">
        <Link to={`/search/users/${data.user_id}`}>
          <h3>{data.username} </h3>
        </Link>
        <p>{data.caption}</p>
      </div>
      <form className="comments__form" onSubmit={handleNewComment}>
        <Link to="/profile">
          <img
            className="comments__avatar avatar"
            src={userData.avatar_url}
            alt={`avatar of ${userData.name}`}
          />
        </Link>
        <input
          className="comments__input"
          type="text"
          placeholder="Add a new comment..."
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          autoComplete="off"
        />
        <button className="comments__button">Post</button>
      </form>
      <section className="comments">
        {isCommentsExpanded && comments ? (
          comments.map((comm) => {
            return (
              <Comment
                key={comm.id}
                data={comm}
                handleCommentDelete={handleCommentDelete}
                currUser={userData.id}
              />
            );
          })
        ) : comments && comments.length ? (
          <h3 className="comments__view-toggle" onClick={showComments}>
            {comments.length === 1
              ? "View 1 comment"
              : `View all ${comments.length} comments`}
          </h3>
        ) : (
          <></>
        )}
      </section>
    </article>
  );
};

export default Post;
