import React, { useState, useEffect, useContext } from "react";
import Post from "./Post";
import './PostList.css';
import { BLOG_API_URL } from "../../../../api";
import { AuthContext } from "../../../Auth/AuthContext";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const { userId } = useContext(AuthContext);
  const [ next, setNext ] = useState(true);
  const [ previous, setPrevious ] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${BLOG_API_URL}/users/get_others_posts/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Fetch posts error:", error);
      }
    };
    fetchPosts();
  }, []);

  const handleClickNext = () => {
    fetchNext();
  };

  const handleClickPrevious = () => {
    fetchPrevious();
  };

  const fetchNext = async () => {
    try {

        const response = await fetch(posts.next);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
        setPrevious(true);
        !data.next && setNext(false);
        window.scrollTo(0, 0);
    } catch (error) {
      console.error("Fetch posts error:", error);
    }
  }

  const fetchPrevious = async () => {
    try {

        const response = await fetch(posts.previous);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
        setNext(true);
        !data.previous && setPrevious(false);
        window.scrollTo(0, 0);
    } catch (error) {
      console.error("Fetch posts error:", error);
    }
  }

  return (
    <div className="post-list-home">
      {posts.results && posts.results.length > 0 ? (
        posts.results.reverse().map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p className="p">There is no posts yet...</p>
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        {next && <button onClick={handleClickNext}>Next</button>}
        {previous && <button onClick={handleClickPrevious}>Previous</button>}
      </div>
    </div>
  );
};

export default PostList;
