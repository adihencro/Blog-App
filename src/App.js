import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';
import PostList from './components/HomePage/Posts/PostList';
import { AuthProvider } from './AuthContext';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="" element={<LoginForm />} />
          </Routes>
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
          </Routes>
          <Routes>
            <Route path="/Home" element={<PostList />} />
          </Routes>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;

