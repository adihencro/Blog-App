import React from "react";
import './Comment.css';

const Comment = ({ allComments, setClickedComment }) => {
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
                </ul>
            </div>
        </div>
    )
};

export default Comment;