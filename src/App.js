import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import PostPage from "./pages/PostPage/PostPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search/users/:userId" element={<ProfilePage />} />
            <Route path="/search/movies/:movieId" element={<MoviePage />} />
            <Route path="/post" element={<SearchPage isPost={true} />} />
            <Route path="/post/:movieId" element={<PostPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
