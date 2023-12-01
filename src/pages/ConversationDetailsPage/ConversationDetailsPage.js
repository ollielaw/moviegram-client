import "./ConversationDetailsPage.scss";
import backArrow from "../../assets/images/back_arrow.svg";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Message from "../../components/Message/Message";
import socket from "../../socket";

const ConversationDetailsPage = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("JWTtoken");
  const userId = sessionStorage.getItem("currUserId");
  const { conversationId } = useParams();

  const [userData, setUserData] = useState();
  const [conversationData, setConversationData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [otherSocket, setOtherSocket] = useState(null);

  const page = useRef(null);

  const fetchMessages = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/conversations/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(data);
      for (let i = 0; i < data.length; i++) {
        if (!data[i].has_seen && data[i].sendee_id === Number(userId)) {
          await axios.put(
            `${process.env.REACT_APP_API_URL}/api/user/conversations/messages/${data[i].id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
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

  const fetchCurrUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(data);
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

  const fetchConversationUser = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/profiles/${conversationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConversationData(data);
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

  useEffect(() => {
    socket.auth = { userId };
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchMessages();
    fetchCurrUser();
    fetchConversationUser();
  }, []);

  useEffect(() => {
    if (page.current) {
      page.current.scrollIntoView({
        behavior: "instant",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messages]);

  const handleNewMessage = async (e) => {
    e.preventDefault();
    if (!newMessage) {
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/conversations/${conversationId}`,
        { message: newMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages([...messages, { ...data, avatar_url: userData.avatar_url }]);
      socket.emit("message", {
        data: {
          ...data,
          avatar_url: userData.avatar_url,
          socketId: otherSocket,
        },
      });
      setNewMessage("");
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

  useEffect(() => {
    socket.on("users", (users) => {
      const otherUser = users.find((user) => user.userId == conversationId);
      if (otherUser) {
        setOtherSocket(otherUser.socketId);
      }
      return;
    });
    socket.on("user connected", (user) => {
      if (user.userId == conversationId) {
        setOtherSocket(user.socketId);
      }
    });
    socket.on("message", ({ data }) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  if (!(messages && userData && conversationData)) return null;

  return (
    <main className="chat" ref={page}>
      <section className="chat__header">
        <img
          src={backArrow}
          alt="back navigation button"
          className="chat__backarrow"
          onClick={() => navigate(-1)}
        />
        <Link to={`/search/users/${conversationId}`}>
          <img
            className="chat__info-avatar"
            src={conversationData.avatar_url}
            alt={`avatar of ${conversationData.name}`}
          />
        </Link>
        <Link
          to={`/search/users/${conversationId}`}
          className="chat__info-names"
        >
          <h1>
            {conversationData.name} ({conversationData.username})
          </h1>
        </Link>
      </section>
      <section className="chat__messages">
        {messages.length ? (
          messages.map((message) => {
            return (
              <Message key={message.id} data={message} currUser={userData.id} />
            );
          })
        ) : (
          <></>
        )}
      </section>
      <form className="chat__form" onSubmit={handleNewMessage}>
        <Link to="/profile">
          <img
            className="chat__avatar"
            src={userData.avatar_url}
            alt={`avatar of ${userData.name}`}
          />
        </Link>
        <input
          className="chat__input"
          type="text"
          placeholder="Message..."
          name="message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          autoComplete="off"
        />
        <button className="chat__button">Send</button>
      </form>
    </main>
  );
};

export default ConversationDetailsPage;
