import React, { useState, useEffect } from 'react';
import Post from './Post'; 
import { BLOG_API_URL } from '../../../api';


const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BLOG_API_URL}/posts`);
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error('Fetch posts error:', error);
      }
    };
    fetchPosts();
  }, []);
  

  return (
    <div className="post-list">
      {posts.results && posts.results.length > 0 ? ( 
        posts.results.map(post => (
          <Post key={post.id} post={post} />
        ))
      ) : (
        <p>There is no posts yet...</p>
      )}
    </div>
  );
};

export default PostList;

