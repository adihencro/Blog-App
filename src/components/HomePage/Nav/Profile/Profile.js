import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../../../Auth/AuthContext";
import { BLOG_API_URL } from "../../../../api";
import Post from "../../Posts/Posts/Post";
import NavBar from "../NavBar";

const Profile = () => {
    const { userId } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${BLOG_API_URL}//users/id/${userId}/?page=1'`);
                if (!response.ok) {
                    throw new Error("Failed to fetch posts");
                }
                const data = await response.json();
                setUserData(data);

            } catch (error) {
                console.error("Fetch posts error:", error);
            }
        }
        fetchUserData();

        const fetchUerPosts = async () => {
            try {
                const response = await fetch(`${BLOG_API_URL}/users/get_all_posts/${userId}?page=1'`);
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
    }, []);

    return (
        <div className="container">
            <div className="post-list">
                <NavBar />
                <div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {userData?.image && <img className="image" src={`${BLOG_API_URL}${userData.image}`} alt="Uploaded" />}
                        <h1 className="user-title">{userData?.username}</h1>
                        <button className="button">Edit Profile</button>
                        <button className="button">Liked Posts</button>
                    </div>
                    <p className="p-profile">{posts.count_posts > 0 ? posts.count_posts : 0} posts</p>
                    <p className="p-profile">{userData?.bio}</p>
                </div>

                <div className="horizontal-border"></div>

                {posts.post && posts.post.length > 0 ? (
                    posts.post.map((post) => <Post key={post.id} post={post} />)
                ) : (
                    <p className="p-post">There is no posts yet...</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
