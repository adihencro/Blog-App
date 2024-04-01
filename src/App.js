import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm/LoginForm';
import RegisterForm from './components/RegisterForm/RegisterForm';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="" element={<LoginForm />}/>
        </Routes>
        <Routes>
          <Route path="/register" element={<RegisterForm />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

/* 
        <Routes>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
*/