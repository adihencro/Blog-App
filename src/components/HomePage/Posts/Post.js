import React, { useState, useEffect } from 'react';
import { BLOG_API_URL } from '../../../api';
import './Post.css';
import { GoHeart } from "react-icons/go";
import { BiCommentDetail } from "react-icons/bi";

const Post = ({ post }) => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    fetch(`${BLOG_API_URL}/posts/advanced_view/${post.id}}`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched post details:', data);
        setDetails(data);
      })
      .catch(error => console.error('Error fetching post details:', error));
  }, []);

  //console.log(details.post.image);

  return (
    <div className="wrapper">
      <h2 className='h2'>{details?.post?.title}</h2> 
      
      {details?.post?.image && details.post.image.length > 0 ? (
            <img className='img' src={`http://127.0.0.1:8000/${details?.post?.image}`}/>
          ) : (
            <p></p>
          )}
      <p className='p'>{details?.post?.content}</p>
      <p className='creator'>creator: {details?.post?.creator_username}</p>
  
      {/* Likes */}
      <div className='likes-comments-container'>
        <h3 className='likes-comments-h3'><GoHeart /> {details?.likes ? details.count_likes : 0}</h3>
        <ul className='likes-comments-ul'>
          {details?.likes && details.likes.length > 0 ? (
            details.likes.map(like => (
              <li className='likes-comments-li' key={like.id}>
                {like.liked_by_username}
                <br />
              </li>
            ))
          ) : (
            <p>No likes yet</p>
          )}
        </ul>
      </div>
  
      {/* Comments */}
      <div className='likes-comments-container'>
        <h3 className='likes-comments-h3'><BiCommentDetail /> {details?.comments ? details.count_comments : 0}</h3>
        <ul className='likes-comments-ul'>
          {details?.comments && details.comments.length > 0 ? (
            details.comments.map(comment => (
              <li className='likes-comments-li' key={comment.id}>
                {comment.content} - {comment.commented_by_username}
                <br />
              </li>
            ))
          ) : (
            <p>No comments yet</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Post;

