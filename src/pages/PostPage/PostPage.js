import "./PostPage.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostPage = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("JWTtoken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, []);
  return <></>;
};

export default PostPage;
