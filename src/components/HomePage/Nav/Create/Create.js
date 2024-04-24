import React, { useContext, useState } from "react";
import "./Create.css";
import { BLOG_API_URL } from "../../../../api";
import { AuthContext } from "../../../Auth/AuthContext";
import { ImFilePicture } from "react-icons/im";
import { MdOutlineDescription } from "react-icons/md";
import NavBar from "../NavBar";

const Create = () => {
  const { token, userId } = useContext(AuthContext);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    content: "",
    image: null,
    creator: userId,
  });

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
      const response = await fetch(`${BLOG_API_URL}/posts/`, {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Token ${token}`, // Add the Authorization header here
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData) {
          throw new Error(`API request failed with status ${response.status}`);
        }
      } else {
        setSuccess("Post added successfully");
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
    <div>
      <NavBar />
      <div className="wrapper">
        <form action="" onSubmit={handleSubmit}>
          <h1>Add Post</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="#description_to_your_post"
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
            <MdOutlineDescription className="react-icon" />
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
          <button type="submit">Create</button>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Create;
