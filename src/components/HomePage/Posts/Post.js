import React, { useState, useEffect } from 'react';
import { BLOG_API_URL } from '../../../api';

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

  return (
    <div className="wrapper">
      <h2>{details?.post?.title}</h2> 
      <p>{details?.post?.content}</p>
  
      {/* Likes section */}
      <div>
        <h3>Likes: {details?.likes ? details.count_likes : 0}</h3>
        <p>
          {details?.likes && details.likes.length > 0 ? (
            details.likes.map(like => (
              <p key={like.id}>
                {like.liked_by_username}
              </p>
            ))
          ) : (
            <p>No likes yet</p>
          )}
        </p>
      </div>
  
      {/* Comments section */}
      <div>
        <h3>Comments: {details?.comments ? details.count_comments : 0}</h3>
        <p>
          {details?.comments && details.comments.length > 0 ? (
            details.comments.map(comment => (
              <p key={comment.id}>
                {comment.content} - {comment.commented_by_username}
              </p>
            ))
          ) : (
            <p>No comments yet</p>
          )}
        </p>
      </div>
    </div>
  );
};

export default Post;

