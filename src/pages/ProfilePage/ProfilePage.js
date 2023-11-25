import "./ProfilePage.scss";
import Post from "../../components/Post/Post";
import backArrow from "../../assets/images/back_arrow.svg";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("JWTtoken");
  const currUser = sessionStorage.getItem("currUserId");

  const [profile, setProfile] = useState(null);
  const [userData, setUserData] = useState(null);
  const [profilePosts, setProfilePosts] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (userId && userId === currUser) {
      navigate("/profile");
      return;
    }
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data);
        if (userId) {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/profiles/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProfile(res.data);
          const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/profiles/${userId}/posts`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProfilePosts(data);
        } else {
          setProfile(response.data);
          const { data } = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/user/posts`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setProfilePosts(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleLogout = () => {
    sessionStorage.removeItem("JWTtoken");
    sessionStorage.removeItem("currUserId");
    navigate("/login");
  };

  if (!(profile && userData)) return null;

  return (
    <main className="profile">
      <img
        src={backArrow}
        alt="back navigation button"
        className="profile__backarrow"
        onClick={() => navigate(-1)}
      />
      <div className="profile__wrapper">
        <section className="profile__info">
          <img
            className="profile__avatar avatar"
            src={profile.avatar_url}
            alt={`avatar of ${profile.name}`}
          />
          <div className="profile__info-container">
            <div className="profile__info-names">
              <h2>
                {profile.name} ({profile.username})
              </h2>
              {userId ? (
                <></>
              ) : (
                <button
                  className="profile__signout-button"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              )}
            </div>
            <h3 className="reviews">
              {profile.num_posts ? profile.num_posts : "0"} review
              {profile.num_posts === 1 ? "" : "s"}
            </h3>
          </div>
        </section>
        <section className="profile__bio">
          <h3 className="profile__bio-heading">About me: </h3>
          <p className="profile__bio-content">{profile.bio}</p>
        </section>
        {profilePosts && profilePosts.length ? (
          <section className="profile__reviews">
            <h2>
              {profilePosts.length === 1
                ? "1 Review"
                : `${profilePosts.length} Reviews`}
            </h2>
            <div className="profile__review-container">
              {profilePosts.map((post) => {
                return (
                  <Post
                    key={post.id}
                    data={post}
                    userData={userData}
                    token={token}
                  />
                );
              })}
            </div>
          </section>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
};

export default ProfilePage;
