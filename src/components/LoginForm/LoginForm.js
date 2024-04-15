import React, { useContext } from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { BLOG_API_URL } from '../../api';
import { AuthContext } from '../Auth/AuthContext';
import { Navigate } from 'react-router';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { isLoggedIn, login } = useContext(AuthContext); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    console.log({ formData });
          
    try {
      const response = await fetch(`${BLOG_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {      
        if (data && data.non_field_errors) {
            throw new Error(`${data.non_field_errors}`);
        } else {
            throw new Error(`API request failed with status ${response.status}`);
        }
      }
      else {
        setSuccess("Login successful!");
        setTimeout(() => {
            setSuccess('');
            }, 1800);
            console.log(data);
            login(data.token, data.id);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='wrapper'>
      <form action='' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='input-box'>
          <input type='text' placeholder='Username' id="username" name="username" value={formData.username} onChange={handleChange} required />
          <FaUser className='icon' />
        </div>
        <div className='input-box'>
          <input type='password' placeholder='Password' id="password" name="password" value={formData.password} onChange={handleChange} required />
          <FaLock className='icon' />
        </div>
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Logging...' : 'Login'}
        </button>
        <div className='register-link'>
          <p>Don't have an account? <Link to='/register'>Register</Link></p>
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        {isLoggedIn && <Navigate to="/home" />}
      </form>
    </div>
  );
};

export default LoginForm;



