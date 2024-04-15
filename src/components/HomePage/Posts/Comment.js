import React, { useEffect, useState, useContext } from "react";
import './Comment.css';
import { BLOG_API_URL } from "../../../api";
import { AuthContext } from "../../Auth/AuthContext";

const Comment = ({ allComments, setClickedComment, postID }) => {
    const { token, userId } = useContext(AuthContext);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        content: '',
        post: postID,
        comment_by: userId
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handlerOnClick = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${BLOG_API_URL}/comments/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            console.log(data);
            
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            else {
                setSuccess("Comment added!");
                setTimeout(() => {
                    setSuccess('');
                }, 1800);
            }
        } catch (error) {
            setError(error.message);
        }
    }


    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="close-button" onClick={() => {
                    setClickedComment(false);
                }}>
                    <span className="close-icon">X</span>
                </div>
                <p className="title">Comments</p>
                <ul className='ul'>
                    {allComments.map(comment => (
                        <li className='li' key={comment.id}>
                            <p className='p-name'>@{comment.commented_by_username}</p>
                            <p className='p'>{comment.content}</p>
                        </li>
                    ))}
                    <li className="li" />
                    <label className="comment-label">
                        Add comment: <input className="comment-input" id="content" name="content" value={formData.content} onChange={handleChange} />
                        <button onClick={handlerOnClick}>Add</button>
                    </label>
                </ul>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </div>
        </div>
    )
};

export default Comment;