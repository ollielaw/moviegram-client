import "./LoginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const token = sessionStorage.getItem("JWTtoken");

  useEffect(() => {
    if (token) {
      navigate("/");
      return;
    }
  }, []);

  const isEmailValid = () => {
    if (!email) return false;
    return true;
  };

  const isPasswordValid = () => {
    if (!password) return false;
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!(isEmailValid() && isPasswordValid())) {
      return;
    }
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        {
          email,
          password,
        }
      );
      sessionStorage.setItem("JWTtoken", data.token);
      setIsLoginError(false);
      setErrorMessage("");
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoginError(true);
    }
  };

  return (
    <main className="login">
      <h1 className="login__header">MovieGram</h1>
      <form className="login__form" onSubmit={handleLogin}>
        <input
          className="login__input"
          type="text"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login__input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login__button">Log In</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register Here.</Link>
      </p>
    </main>
  );
};

export default LoginPage;
