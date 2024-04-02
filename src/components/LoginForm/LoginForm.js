import React from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useState } from 'react'; 

const LoginForm = () => {

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

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

        console.log({formData});
    
        /* 
               try {
          const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
    
          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }
    
          const data = await response.json();
          setSuccess('Login successful!'); 
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
        */
 
      };

    return (
        <div className='wrapper'>
            <form action='' onSubmit={ handleSubmit }>
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
            </form>
        </div>
    );
};

export default LoginForm;



