import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import PostList from "./components/HomePage/Posts/Posts/PostList";
import HomePage from "./components/HomePage/HomePage";
import { AuthProvider } from "./components/Auth/AuthContext";
import { PrivateRoute } from "./components/Auth/PrivateRoute";
import { PostProvider } from "./components/HomePage/Posts/Posts/PostContext";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <PostProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LoginForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
                <Route path="/home" element={<PrivateRoute />}>
                  <Route path="/home" element={<HomePage />} />
                </Route>
            </Routes>
          </Router>
          </PostProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
