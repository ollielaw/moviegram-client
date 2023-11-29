import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import PostPage from "./pages/PostPage/PostPage";
import MoviePage from "./pages/MoviePage/MoviePage";
import ConversationsPage from "./pages/ConversationsPage/ConversationsPage";
import ConversationDetailsPage from "./pages/ConversationDetailsPage/ConversationDetailsPage";
import Layout from "./components/Layout/Layout";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

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
            <Route
              path="/search/share/:movieId"
              element={<SearchPage isShare={true} />}
            />
            <Route path="/search/users/:userId" element={<ProfilePage />} />
            <Route path="/search/movies/:movieId" element={<MoviePage />} />
            <Route path="/post" element={<SearchPage isPost={true} />} />
            <Route path="/post/:movieId" element={<PostPage />} />
            <Route path="/conversations" element={<ConversationsPage />} />
            <Route
              path="/conversations/new"
              element={<SearchPage isChat={true} />}
            />
            <Route
              path="/conversations/chat/:conversationId"
              element={<ConversationDetailsPage />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
