import React, { useState, useEffect, useContext } from "react";
import Post from "./Post";
import './PostList.css';
import { BLOG_API_URL } from "../../../../api";
import { AuthContext } from "../../../Auth/AuthContext";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BLOG_API_URL}/posts/`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Fetch posts error:", error);
      }
    };
    fetchPosts();

    const fetchDataInterval = setInterval(fetchPosts, 3000); // Fetch data every 5 seconds
    return () => clearInterval(fetchDataInterval);
  }, []);

  return (
    <div className="post-list-home">
      {posts && posts.length > 0 ? (
        posts.reverse().map((post) => userId !== post.creator && <Post key={post.id} post={post} />)
      ) : (
        <p className="p">There is no posts yet...</p>
      )}
    </div>
  );
};

export default PostList;
