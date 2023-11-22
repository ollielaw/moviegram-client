import "./Comment.scss";

const Comment = ({ data }) => {
  return (
    <article className="comment">
      <header className="comment__header">
        <div className="comment__header-container">
          <img
            className="comment__avatar avatar"
            src={data.avatar_url}
            alt={`avatar of ${data.username}`}
          />
          <h4 className="comment__username">{data.username}</h4>
        </div>
        <p className="comment__timestamp">{data.created_at}</p>
      </header>
      <div className="comment__content">
        <p>{data.content}</p>
      </div>
    </article>
  );
};

export default Comment;
