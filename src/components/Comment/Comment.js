import "./Comment.scss";
import { timestampToDynamic } from "../../utils/formattingFunctions";
import { Link } from "react-router-dom";
import DeleteModal from "../DeleteModal/DeleteModal";

const Comment = ({ data, handleCommentDelete, currUser }) => {
  const isUserComment = data.user_id === currUser;
  return (
    <article className="comment">
      <header className="comment__header">
        <div className="comment__header-container">
          <Link to={`/search/users/${data.user_id}`}>
            <img
              className="comment__avatar avatar"
              src={data.avatar_url}
              alt={`avatar of ${data.username}`}
            />
          </Link>
          <Link to={`/search/users/${data.user_id}`}>
            <h4 className="comment__username">{data.username}</h4>
          </Link>
          {isUserComment && (
            <DeleteModal handleDelete={handleCommentDelete} data={data} />
          )}
        </div>
        <h4 className="comment__timestamp">
          {timestampToDynamic(Date.parse(data.created_at))}
        </h4>
      </header>
      <div className="comment__content">
        <p>{data.content}</p>
      </div>
    </article>
  );
};

export default Comment;
