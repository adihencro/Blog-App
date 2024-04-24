import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import HomePage from "./components/HomePage/HomePage";
import { AuthProvider } from "./components/Auth/AuthContext";
import { PrivateRoute } from "./components/Auth/PrivateRoute";
import { PostProvider } from "./components/HomePage/Posts/Posts/PostContext";
import Profile from "./components/HomePage/Nav/Profile/Profile";
import Create from "./components/HomePage/Nav/Create/Create";
import Search from "./components/HomePage/Nav/Search/Search";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <PostProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/home" element={<PrivateRoute />}>
                <Route path="/home" element={<HomePage />} />
              </Route>
              <Route path="/search" element={<PrivateRoute />}>
                <Route path="/search" element={<Search />} />
              </Route>
              <Route path="/create" element={<PrivateRoute />}>
                <Route path="/create" element={<Create />} />
              </Route>
              <Route path="/profile/:userId" element={<PrivateRoute />}>
                <Route path="/profile/:userId" element={<Profile />} />
              </Route>
            </Routes>
          </Router>
        </PostProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
