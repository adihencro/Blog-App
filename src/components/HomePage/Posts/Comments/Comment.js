import React, {useState, useContext } from "react";
import './Comment.css'
import { BLOG_API_URL } from "../../../../api";
import { AuthContext } from "../../../Auth/AuthContext";

const Comment = ({ allComments, setClickedComment, postID }) => {
  const { token, userId } = useContext(AuthContext);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    content: "",
    post: postID,
    comment_by: userId,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handlerOnClick = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BLOG_API_URL}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      } else {
        setSuccess("Comment added!");
        setTimeout(() => {
          setSuccess("");
        }, 1800);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="modalBackground-c">
      <div className="modalContainer-c">
        <div
          className="close-button-c"
          onClick={() => {
            setClickedComment(false);
          }}
        >
          <span className="close-icon-c">X</span>
        </div>
        <p className="title-c">Comments</p>
        <ul className="ul-c">
          {allComments && allComments.length > 0 && allComments.map((comment) => (
            <li className="li-c" key={comment.id}>
              <p className="p-name-c">@{comment.commented_by_username}</p>
              <p className="p-comment-c">{comment.content}</p>
            </li>
          ))}
          <li className="li-c" />
          <label className="comment-label-c">
            Add comment:{" "}
            <input
              className="comment-input-c"
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
            <button onClick={handlerOnClick}>Add</button>
          </label>
        </ul>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    </div>
  );
};

export default Comment;
