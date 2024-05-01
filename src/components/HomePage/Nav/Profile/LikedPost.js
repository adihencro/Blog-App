import React, { useContext, useEffect, useState } from "react";
import "./LikedPost.css";
import { AuthContext } from "../../../Auth/AuthContext";
import { fetchUserLikedPosts } from "../../../../api";
import Post from "../../Posts/Posts/Post";
import NavBar from "../NavBar";

const LikedPost = () => {
  const { userId } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await fetchUserLikedPosts(userId);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();

    const fetchDataInterval = setInterval(fetchPosts, 2000); 
    return () => clearInterval(fetchDataInterval);
  }, [userId]);
  
  return (
    <div className="container">
      <div className="post-list">
        <NavBar />
        <h1 className="h1">Saved</h1>
        {posts?.posts && posts?.posts.length > 0 ? (
          posts?.posts
            ?.reverse()
            .map((post) => <Post key={post[0]?.id} post={post[0]} />)
        ) : (
          <p className="p-liked-post">There is no posts yet...</p>
        )}
      </div>
    </div>
  );
};

export default LikedPost;
