import "./ProfilePage.scss";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ProfilePage = ({ profileData }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("JWTtoken");

  const [profile, setProfile] = useState();
  const [profilePosts, setProfilePosts] = useState();

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchProfile = async () => {
      try {
        if (userId) {
          setProfile(profileData);
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
          setProfile(userData);
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

  if (!(profile && profilePosts)) return null;

  return <></>;
};

export default ProfilePage;
