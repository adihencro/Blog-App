import React, { useContext, useState } from "react";
import { BLOG_API_URL } from "../../../../api";
import { AuthContext } from "../../../Auth/AuthContext";
import { ImFilePicture } from "react-icons/im";
import { MdOutlineDescription } from "react-icons/md";
import { useParams } from "react-router-dom";
import NavBar from "../../Nav/NavBar";

const EditPost = () => {
  const { token, userId } = useContext(AuthContext);
  const { postID } = useParams();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    content: "",
    image: null,
    creator: userId,
    id: postID
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
  
    if (name === "image" && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    for (let key in formData) {
      console.log(formData[key]);
      formData[key] && formDataToSend.append(key, formData[key]);
    }

    console.log(formDataToSend);

    try {
      const response = await fetch(`${BLOG_API_URL}/posts/update/${postID}/`, {
        method: "PATCH",
        body: formDataToSend, //application/json doesn't support file uploads.
        headers: {
          Authorization: `Token ${token}`, 
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData) {
            console.log(errorData);
          throw new Error(`API request failed with status ${response.status}`);
        }
      } else {
        setSuccess("Post updated successfully");
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
          <h1>Edit Post</h1>
          <p>Change the content of your post or the image</p>
          <div className="input-box">
            <input
              type="text"
              placeholder="#description_to_your_post"
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
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
            />
            <ImFilePicture className="icon" />
          </div>
          <button type="submit">Edit</button>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditPost;
