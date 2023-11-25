import "./Post.scss";
import Comment from "../Comment/Comment";
import likeEmptyIcon from "../../assets/images/like_empty_icon.svg";
import likeFullIcon from "../../assets/images/like_full_blue_icon.svg";
import commentIcon from "../../assets/images/comment_icon.svg";
import postIcon from "../../assets/images/upload_icon.svg";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { timestampToDynamic } from "../../utils/formattingFunctions";

const Post = ({ data, userData, token }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState(null);
  const [isCommentsExpanded, setIsCommentsExapnded] = useState(false);
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(data.user_liked);
  const [numLikes, setNumLikes] = useState(data.num_likes);

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
        </div>
        <h3 className="post__timestamp">
          {timestampToDynamic(Date.parse(data.created_at))}
        </h3>
      </header>
      <Link to={`/search/movies/${data.tmdb_id}`}>
        <img
          src={`https://image.tmdb.org/t/p/original${data.poster_url}`}
          alt={`poster of ${data.movie_name}`}
          className="post__poster"
        />
      </Link>
      <div className="post__rating-section">
        <h2
          className={
            data.rating >= 5 ? "post__rating--good" : "post__rating--bad"
          }
        >
          {data.rating} / 10
        </h2>
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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="comments__button">Post</button>
      </form>
      <section className="comments">
        {isCommentsExpanded ? (
          comments.map((comm) => {
            return <Comment key={comm.id} data={comm} />;
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
