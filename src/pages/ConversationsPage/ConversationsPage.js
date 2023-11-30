import "./ConversationsPage.scss";
import SearchItem from "../../components/SearchItem/SearchItem";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ConversationsPage = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("JWTtoken");
  const userId = sessionStorage.getItem("currUserId");

  const [conversations, setConversations] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchConversations = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user/conversations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setConversations(data);
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
    fetchConversations();
  }, []);

  if (!conversations) return null;

  return (
    <main className="convos">
      <div className="convos__button-container">
        <button
          className="convos__button"
          type="button"
          onClick={() => navigate("new")}
        >
          Start a new conversation
        </button>
      </div>
      <section className="convos__card-container">
        <h2 className="convos__heading">
          {conversations.length === 1
            ? "1 conversation"
            : `${conversations.length} conversations`}
        </h2>
        {conversations.length ? (
          conversations.map((convo) => {
            return (
              <SearchItem
                key={convo.conversation_id}
                data={convo}
                isConvo={true}
                category="people"
              />
            );
          })
        ) : (
          <></>
        )}
      </section>
    </main>
  );
};

export default ConversationsPage;
