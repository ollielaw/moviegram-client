import "./RegisterPage.scss";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const token = sessionStorage.getItem("JWTtoken");

  useEffect(() => {
    if (token) {
      navigate("/");
      return;
    }
  }, []);

  const isEmailValid = () => {
    return email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const isUsernameValid = () => {
    return /^[\w-\.]+$/.test(username);
  };

  const isPasswordValid = () => {
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}/.test(password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isEmailValid()) {
      setError("Must enter a valid email address.");
      return;
    }
    if (!name) {
      setError("Must enter your name.");
      return;
    }
    if (!username) {
      setError("Must enter a username.");
      return;
    }
    if (!isUsernameValid()) {
      setError(
        "Username can only contain letters, numbers, hyphens(-), underscores(_), and periods(.)."
      );
      return;
    }
    if (!isPasswordValid()) {
      setError(
        "Password must be 8-15 characters long with at least one uppercase letter, one lowercase letter, and one digit."
      );
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords must match.");
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, {
        email,
        name,
        bio,
        avatar_url: "",
        username,
        password,
      });
      window.alert("Successfully registered MovieGram account!");
      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <main className="register">
      <h1 className="register__header">MovieGram</h1>
      {error && <div className="register__message">{error}</div>}
      <form className="register__form" onSubmit={handleRegister}>
        <input
          className="register__input"
          type="text"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="register__input"
          type="text"
          name="name"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="register__input"
          type="text"
          name="bio"
          placeholder="Bio (optional)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <input
          className="register__input"
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="register__input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="register__input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="register__button">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <Link className="register__login" to="/login">
          Login Here.
        </Link>
      </p>
    </main>
  );
};

export default RegisterPage;
