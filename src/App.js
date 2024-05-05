import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import HomePage from "./components/HomePage/HomePage";
import { AuthProvider } from "./components/Auth/AuthContext";
import { LikeProvider } from "./components/HomePage/Posts/Likes/LikeContext"; 
import { PrivateRoute } from "./components/Auth/PrivateRoute";
import Profile from "./components/HomePage/Nav/Profile/Profile";
import Create from "./components/HomePage/Nav/Create/Create";
import Search from "./components/HomePage/Nav/Search/Search";
import LikedPost from "./components/HomePage/Nav/Profile/LikedPost";
import EditProfile from "./components/HomePage/Nav/Profile/EditProfile";
import EditPost from "./components/HomePage/Posts/Modify/EditPost";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <LikeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LoginForm />} />
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
              <Route path="/profile/likedPost" element={<PrivateRoute />}>
                <Route path="/profile/likedPost" element={<LikedPost />} />
              </Route>
              <Route path="/profile/Edit" element={<PrivateRoute />}>
                <Route path="/profile/Edit" element={<EditProfile />} />
              </Route>
              <Route path="/post/edit/:postID" element={<PrivateRoute />}>
                <Route path="/post/edit/:postID" element={<EditPost />} />
              </Route>
            </Routes>
          </Router>
        </LikeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
