import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import HomePage from "./pages/HomePage/HomePage";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import PostPage from "./pages/PostPage/PostPage";
import MoviePage from "./pages/MoviePage/MoviePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/users/:userId" element={<ProfilePage />} />
          <Route path="/search/movies/:movieId" element={<MoviePage />} />
          <Route path="/post" element={<SearchPage />} />
          <Route path="/post/:movieId" element={<PostPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
