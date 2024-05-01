//import React, { useState, useContext } from "react";
//import { BLOG_API_URL } from "../../../../api";
import NavBar from "../NavBar";
import './EditProfile.css'
//import { AuthContext } from "../../../Auth/AuthContext";


const EditProfile = () => {
    /* 
        const { userId } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        bio: "",
        image: null
      });
    
      const [error, setError] = useState(null);
      const [success, setSuccess] = useState(null);
    */


    return (
        <div>
            <NavBar />
            <div className="wrapper">
                <h1>Edit your profile</h1>
            </div>
        </div>
    );
};

export default EditProfile;
