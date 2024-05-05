import React from "react";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsPencilFill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { BiOutline } from "react-icons/bi";
import { ImFilePicture } from "react-icons/im";
import "./EditProfile.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../../Auth/AuthContext";
import { BLOG_API_URL } from "../../../../api";
import NavBar from "../NavBar";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    image: null
  });

  const { token, userId } = useContext(AuthContext);
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
        formData[key] && formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch(`${BLOG_API_URL}/users/update/${userId}/`, {
        method: "PATCH",
        body: formDataToSend, //application/json doesn't support file uploads.
        headers: {
            Authorization: `Token ${token}`, 
          },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        if (errorData && errorData.username) {
          throw new Error(`Username: ${errorData.username.join(", ")}`);
        } else if (errorData && errorData.email) {
          throw new Error(`Email: ${errorData.email.join(", ")}`);
        } else {
          throw new Error(`API request failed with status ${response.status}`);
        }
      } else {
        setSuccess("Profile updated successfully");
        setTimeout(() => {
          setSuccess("");
        }, 1800);
        console.log(response.json());
      }
    } catch (error) {
      setError(error.message);
    } 
  };

  return (
    <>
        <NavBar />
        <div className="wrapper">
            <form action="" onSubmit={handleSubmit}>
                <div className="wrapper-profile">
                    <h1>Edit Profile</h1>
                </div>
                <p>Fill in the details you want to change</p>
                <div className="input-box">
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <FaUser className="icon" />
                </div>
                <div className="input-box">
                <input
                    type="text"
                    placeholder="First Name"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
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
                />
                <ImFilePicture className="icon" />
                </div>
                <button type="submit">
                Edit
                </button>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </form>
        </div>
    </>
  );
};

export default EditProfile;
