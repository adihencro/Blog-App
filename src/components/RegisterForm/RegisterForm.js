import React from 'react';
import './RegisterForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsPencilFill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { BiOutline } from "react-icons/bi";
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    return (
        <div className='wrapper'>
            <form action=''>
                <h1>Register</h1>
                <div className='input-box'>
                    <input type='text' placeholder='Username' required />
                    <FaUser className='icon'/>
                </div>
                <div className='input-box'>
                    <input type='password' placeholder='Password' required />
                    <FaLock className='icon'/>
                </div>
                <div className='input-box'>
                    <input type='text' placeholder='First Name' required />
                    <BsPencilFill className='icon'/>
                </div>
                <div className='input-box'>
                    <input type='text' placeholder='Last Name' required />
                    <FaPencilAlt className='icon'/>
                </div>
                <div className='input-box'>
                    <input type='email' placeholder='Email' required />
                    <MdEmail className='icon'/>
                </div>
                <div className='input-box'>
                    <input type='text' placeholder='Bio' required />
                    <BiOutline className='icon'/>
                </div>
                <button type='subimt'>Register</button>
                <div className='register-link'>
                    <p>Already have an account? <Link to='/'>Login</Link></p>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;