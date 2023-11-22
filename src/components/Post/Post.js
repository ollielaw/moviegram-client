import "./Post.scss";
import Comment from "../Comment/Comment";
import likeEmptyIcon from "../../assets/images/like_empty_icon.svg";
import likeFullIcon from "../../assets/images/like_full_icon.svg";
import commentIcon from "../../assets/images/comment_icon.svg";
import postIcon from "../../assets/images/upload_icon.svg";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Post = ({ data, userData, token }) => {
  const [comments, setComments] = useState(null);
  const [comment, setComment] = useState("");

  const showComments = async () => {
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

  return (
    <article className="post">
      <header className="post__header">
        <div className="post__header-container">
          <img
            className="post__avatar avatar"
            src={data.avatar_url}
            alt={`avatar of ${data.name}`}
          />
          <h3 className="post__username">{data.username}</h3>
        </div>
        <p className="post__timestamp">5 mins ago</p>
      </header>
      <img
        src={`https://image.tmdb.org/t/p/original${data.poster_url}`}
        alt={`poster of ${data.movie_name}`}
        className="post__poster"
      />
      <div className="post__rating-section">
        <h2>{data.rating}/10</h2>
      </div>
      <div className="post__cta-section">
        <div className="post__icon-container">
          <img
            className="post__icon post__icon--first"
            src={likeEmptyIcon}
            alt="like button"
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
          />
        </div>
        <p>{data.num_likes} likes</p>
      </div>
      <div className="post__review-section">
        <h4>{data.username} </h4>
        <p>{data.caption}</p>
      </div>
      <form className="comments__form">
        <img
          className="comments__avatar avatar"
          src={userData.avatar_url}
          alt={`avatar of ${userData.name}`}
        />
        <input
          className="comments__input"
          type="text"
          name="comment"
          placeholder="Add a new comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="comments__button">Post</button>
      </form>
      <section className="comments">
        {comments ? (
          comments.map((comm) => {
            return <Comment key={comm.id} data={comm} />;
          })
        ) : (
          <h4 className="comments__view-toggle" onClick={showComments}>
            View comments
          </h4>
        )}
      </section>
    </article>
  );
};

export default Post;
