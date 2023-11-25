import "./HomePage.scss";
import Post from "../../components/Post/Post";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [userData, setUserData] = useState();
  const [feed, setFeed] = useState();
  const [page, setPage] = useState(2);

  const navigate = useNavigate();

  const token = sessionStorage.getItem("JWTtoken");

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
      console.error(error);
    }
  };

  if (!(feed && userData)) return null;

  return (
    <main className="feed">
      {feed.map((post) => {
        return (
          <Post
            key={post.id}
            data={post}
            userData={userData}
            token={token}
            handlePostDelete={handlePostDelete}
          />
        );
      })}
      <button type="button" className="feed__button" onClick={handleLoad}>
        Load More
      </button>
    </main>
  );
};

export default HomePage;
