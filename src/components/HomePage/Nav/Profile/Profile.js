import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../../../Auth/AuthContext";
import { BLOG_API_URL } from "../../../../api";
import Post from "../../Posts/Posts/Post";
import NavBar from "../NavBar";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { userId: urlUserId } = useParams();
  const { userId: contextUserId } = useContext(AuthContext);
  const userId = urlUserId || contextUserId;
  const urlUserIdInt = parseInt(urlUserId, 10);
  const className = urlUserIdInt === contextUserId ? "image-profile-with" : "image-profile";
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${BLOG_API_URL}/users/id/${userId}/`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Fetch posts error:", error);
      }
    };
    fetchUserData();

    const fetchUerPosts = async () => {
      try {
        const response = await fetch(
          `${BLOG_API_URL}/users/get_all_posts/${userId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Fetch posts error:", error);
      }
    };
    fetchUerPosts();

    const fetchDataInterval = setInterval(fetchUerPosts, 5000); // Fetch data every 5 seconds
    return () => clearInterval(fetchDataInterval);
  }, [userId]);

  const LikedPostHandler = () => {
    navigate(`/profile/LikedPost`);
  };

  const EditProfileHandler = () => {
    navigate(`/profile/Edit`);
  };

  return (
    <div className="container">
      <div className="post-list">
        <NavBar />
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {userData?.image && (
              <img
                className={className}
                src={`${BLOG_API_URL}${userData.image}`}
                alt="Uploaded"
              />
            )}
            <h1 className="user-title">@{userData?.username}</h1>
            {urlUserIdInt === contextUserId && <button className="button-profile" onClick={EditProfileHandler}>Edit Profile</button>}
            {urlUserIdInt === contextUserId && <button className="button-profile"  onClick={LikedPostHandler}>Liked Posts</button>}
          </div>
          <p className="p-profile">
            {posts.count_posts > 0 ? posts.count_posts : 0} posts
          </p>
          <p className="p-profile">{userData?.bio}</p>
        </div>

        <div className="horizontal-border"></div>

        {posts.post && posts.post.length > 0 ? (
          posts.post.reverse().map((post) => <Post key={post.id} post={post} />)
        ) : (
          <p className="p-post">There is no posts yet...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
