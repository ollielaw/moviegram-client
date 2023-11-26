import "./LoginPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const token = sessionStorage.getItem("JWTtoken");

  useEffect(() => {
    if (token) {
      navigate("/");
      return;
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        {
          email,
          password,
        }
      );
      sessionStorage.setItem("JWTtoken", data.token);
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });
      sessionStorage.setItem("currUserId", res.data.id);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <main className="login">
      <h1 className="login__header">MovieGram</h1>
      {error && <div className="login__message">{error}</div>}
      <form className="login__form" onSubmit={handleLogin}>
        <input
          className="login__input"
          type="text"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          className="login__input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
        <button className="login__button">Log In</button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link className="login__register" to="/register">
          Register Here.
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
