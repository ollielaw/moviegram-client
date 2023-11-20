import "./HomePage.scss";
import Post from "../../components/Post/Post";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
  const [feed, setFeed] = useState([]);

  const navigate = useNavigate();

  const token = sessionStorage.getItem("JWTtoken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
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
    fetchFeed();
  }, []);

  if (!feed) return null;

  return (
    <main className="feed">
      <h1>Welcome to Home Page</h1>
      {feed.map((post) => {
        return <Post key={post.id} data={post} />;
      })}
    </main>
  );
};

export default HomePage;
