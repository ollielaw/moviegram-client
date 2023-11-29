import "./HomePage.scss";
import Post from "../../components/Post/Post";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const token = sessionStorage.getItem("JWTtoken");
  const displayType = sessionStorage.getItem("display");

  const [userData, setUserData] = useState();
  const [feed, setFeed] = useState();
  const [page, setPage] = useState(2);
  const [isBackdrop, setIsBackdrop] = useState(displayType === "backdrop");

  const navigate = useNavigate();

  const fetchFeed = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/feed`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeed(data);
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
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchUser = async () => {
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
    fetchUser();
    fetchFeed();
  }, []);

  const handleLoad = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/user/feed?p=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeed([...feed, ...data]);
      setPage(page + 1);
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

  const handlePostDelete = async (postId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchFeed();
      setPage(2);
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

  const toggleDisplay = (type) => {
    if (
      (isBackdrop && type === "backdrop") ||
      (!isBackdrop && type === "poster")
    ) {
      return;
    }
    sessionStorage.setItem("display", type);
    setIsBackdrop(!isBackdrop);
  };

  if (!(feed && userData)) return null;

  return (
    <main className="feed__wrapper">
      <div className="feed__toggles">
        <button
          type="button"
          className={`feed__toggle feed__toggle--poster ${
            isBackdrop ? "" : "feed__toggle--active"
          }`}
          onClick={() => toggleDisplay("poster")}
        >
          Display Posters
        </button>
        <button
          type="button"
          className={`feed__toggle feed__toggle--backdrop ${
            isBackdrop ? "feed__toggle--active" : ""
          }`}
          onClick={() => toggleDisplay("backdrop")}
        >
          Display Backdrops
        </button>
      </div>
      <section className="feed">
        {feed.map((post) => {
          return (
            <Post
              key={post.id}
              data={post}
              isBackdrop={isBackdrop}
              userData={userData}
              token={token}
              handlePostDelete={handlePostDelete}
            />
          );
        })}
        <button type="button" className="feed__button" onClick={handleLoad}>
          Load More
        </button>
      </section>
    </main>
  );
};

export default HomePage;
