import React from "react";
import "./RegisterForm.css";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsPencilFill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { BiOutline } from "react-icons/bi";
import { ImFilePicture } from "react-icons/im";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BLOG_API_URL } from "../../api";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    image: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (event) => {
    const { name, value, files } = event.target;  

    if (name === "image") {  
      setFormData({ ...formData, [name]: files[0] }); 
    } else {
      setFormData({ ...formData, [name]: value });  
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    console.log(formDataToSend);

    try {
      const response = await fetch(`${BLOG_API_URL}/users/register`, {
        method: "POST",
        body: formDataToSend, //application/json doesn't support file uploads.
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData && errorData.username) {
          throw new Error(`Username: ${errorData.username.join(", ")}`);
        } else if (errorData && errorData.email) {
          throw new Error(`Email: ${errorData.email.join(", ")}`);
        } else {
          throw new Error(`API request failed with status ${response.status}`);
        }
      } else {
        setSuccess("Registered successfully");
        setTimeout(() => {
          setSuccess("");
        }, 1800);
        console.log(response.json());
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <form action="" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <FaUser className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="First Name"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <BsPencilFill className="icon" />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Last Name"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <FaPencilAlt className="icon" />
        </div>
        <div className="input-box">
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <MdEmail className="icon" />
        </div>
        <div className="input-box">
          <input
            type="text"
            placeholder="Bio"
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
          />
          <BiOutline className="icon" />
        </div>
        <div className="input-box">
          <input
            type="file"
            placeholder="Select Image"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
          <ImFilePicture className="icon" />
        </div>
        <button type="submit" disabled={isLoading}>
          Register
        </button>
        <div className="register-link">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
