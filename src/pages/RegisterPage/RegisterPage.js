import "./RegisterPage.scss";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isRegisterError, setIsRegisterError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isEmailValid = () => {
    if (!email) return false;
    return true;
  };

  const isNameValid = () => {
    if (!name) return false;
    return true;
  };

  const isUsernameValid = () => {
    if (!username) return false;
    return true;
  };

  const isPasswordValid = () => {
    if (!password) return false;
    return true;
  };

  const isConfirmPasswordValid = () => {
    if (password === confirmPassword) {
      return true;
    }
    return false;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      !(
        isEmailValid() &&
        isNameValid() &&
        isUsernameValid() &&
        isPasswordValid &&
        isConfirmPasswordValid()
      )
    ) {
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
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
      setIsRegisterError(true);
    }
  };

  return (
    <main className="register">
      <h1 className="register_header">MovieGram</h1>
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
          placeholder="Bio"
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
          type="text"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="register__input"
          type="text"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button className="register__button">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login Here.</Link>
      </p>
    </main>
  );
};

export default RegisterPage;
