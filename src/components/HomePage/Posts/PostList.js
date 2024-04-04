import React, { useState, useEffect } from 'react';
import Post from './Post'; 
import { BLOG_API_URL } from '../../../api';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from your API here
    fetch(`${BLOG_API_URL}/posts`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched posts:', data); 
        setPosts(data);
      })
  }, []);
  

  return (
    <div className="post-list">
      {posts.results && posts.results.length > 0 ? ( 
        posts.results.map(post => (
          <Post key={post.id} post={post} />
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
};

export default PostList;