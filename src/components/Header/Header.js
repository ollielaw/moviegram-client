import "./Header.scss";
import homeIcon from "../../assets/images/home_icon.svg";
import searchIcon from "../../assets/images/search_icon.svg";
import uploadIcon from "../../assets/images/upload_icon.svg";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Header = () => {
  const [userData, setUserData] = useState(null);
  const token = sessionStorage.getItem("JWTtoken");

  useEffect(() => {
    if (!token) {
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
  }, []);

  if (!token) {
    return <></>;
  }

  if (!userData) return null;

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__logo">
          <h2>MovieGram</h2>
        </Link>
        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img
              src={homeIcon}
              alt="home navigation icon"
              className="nav__icon nav__icon--first"
            />
          </NavLink>
          <NavLink
            to="/search"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img
              src={searchIcon}
              alt="search navigation icon"
              className="nav__icon"
            />
          </NavLink>
          <NavLink
            to="/post"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img
              src={uploadIcon}
              alt="post navigation icon"
              className="nav__icon"
            />
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "inactive")}
          >
            <img
              src={userData.avatar_url}
              alt="user profile navigation icon"
              className="nav__icon nav__icon--avatar"
            />
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
