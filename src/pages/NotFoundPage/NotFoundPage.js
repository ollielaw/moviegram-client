import "./NotFoundPage.scss";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  const token = sessionStorage.getItem("JWTtoken");

  if (token) {
    return (
      <>
        <Header />
        <main className="notfound">
          <h1 className="notfound__title">404 Page Not Found!</h1>
          <h2 className="notfound__subtitle">
            The page you are looking for does not exist, or may have been
            removed.
          </h2>
          <Link className="notfound__link" to="/">
            Would you like to return to MovieGram?
          </Link>
        </main>
      </>
    );
  } else {
    return (
      <main className="notfound">
        <h1 className="notfound__title">404 Page Not Found!</h1>
        <h2 className="notfound__subtitle">
          The page you are looking for does not exist, or may have been removed.
        </h2>
        <p>
          Already have an account?{" "}
          <Link className="notfound__link" to="/login">
            Login Here.
          </Link>
        </p>
        <p>
          Don't have an account?{" "}
          <Link className="notfound__link" to="/register">
            Register Here.
          </Link>
        </p>
      </main>
    );
  }
};

export default NotFoundPage;
