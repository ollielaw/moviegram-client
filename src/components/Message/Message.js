import "./Message.scss";
import { Link } from "react-router-dom";
import { formatMessageDate } from "../../utils/formattingFunctions";

const Message = ({ data, currUser }) => {
  const isUserMessage = currUser === data.sender_id;
  return (
    <article className="message">
      <h3 className="message__time">{formatMessageDate(data.created_at)}</h3>
      <div
        className={`message__content ${
          isUserMessage ? "message__content--user" : ""
        }`}
      >
        <Link
          to={isUserMessage ? "/profile" : `/search/users/${data.sender_id}`}
          className="message__avatar"
        >
          <img src={data.avatar_url} alt={`avatar of ${data.name}`} />
        </Link>
        {data.movie_id ? (
          <Link
            to={`/search/movies/${data.tmdb_id}`}
            className="message__poster-wrapper"
          >
            <img
              src={`https://image.tmdb.org/t/p/original${data.poster_url}`}
              alt={`poster of ${data.movie_name}`}
              className="message__poster"
            />
          </Link>
        ) : (
          <div
            className={`message__message ${
              isUserMessage ? "message__message--user" : ""
            }`}
          >
            <p>{data.message}</p>
          </div>
        )}
      </div>
    </article>
  );
};

export default Message;
